const User = require("../models/user")
const {Router} = require('express')
const { findByIdAndUpdate } = require("../models/user")
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require("../auth")

//Get user route
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json({
        status: 200,
        data: user
    })
})

// Post route - Create Account
router.post('/', async (req, res) => {
    const body = req.body
    const userCheck = await User.find({username: body.username})
    if (userCheck.length !== 0) {
        res.json({
            status: 403,
            msg: "User already exists"
        })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const user = {
                username: body.username,
                password: hashedPassword
            }
            const newUser = await User.create(user)
            const accessToken = await jwt.sign(JSON.stringify(newUser), process.env.TOKEN_SECRET)
            res.json({
                status: 200,
                accessToken,
                user: newUser._id
            })
        } catch(e) {
            console.log(e);
            res.json({message: "Error"})
        }
    }
})

//login verification
router.get('/login/:username/:password', async (req, res) => {
    const username = req.params.username
    const password = req.params.password
    const user = await User.findOne({username: username})
    try {
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            const accessToken = await jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
            if (match) {
                res.json({
                    accessToken,
                    status: 200,
                    user: user._id
                    })
            } else {
                res.json({
                    status: 403,
                    msg: "You have entered an incorrect password."
                })
            }
        } else {
            res.json({
                status: 409,
                msg: "This user does not exist."
            })
        }
    } catch(e) {
        console.log(e);
    }
})


// Update route - favorite
router.put('/favorite/:id', auth, async (req, res) => {
    const id = req.params.id
    const body = req.body
    let updatedUser
    if (body.action === "add") {
        updatedUser = await User.findByIdAndUpdate(id, { $push: {favorites: body.episode}}, {new: true})
    } else if (body.action === "delete") {
        updatedUser = await User.findByIdAndUpdate(id, { $pullAll: {favorites: [body.episode]}}, {new: true})
    }
    res.json({
        status: 200,
        data: updatedUser
    })
})

// Update route - episodes Viewed
router.put('/viewed/:id', auth, async (req, res) => {
    const id = req.params.id
    const body = req.body
    let updatedUser
    if (body.action === "add") {
        updatedUser = await User.findByIdAndUpdate(id, { $push: {episodesViewed: body.episode}}, {new: true})
    } else if (body.action === "delete") {
        updatedUser = await User.findByIdAndUpdate(id, { $pullAll: {episodesViewed: [body.episode]}}, {new: true})
    }
    res.json({
        status: 200,
        data: updatedUser
    })
})




//Delete Route
router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id
    await Video.findByIdAndDelete(id)
    res.json({
        status: 200,
        msg: "Successfully deleted."
    })
})


module.exports = router