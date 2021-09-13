const User = require("../models/user")
const {Router} = require('express')
const { findByIdAndUpdate } = require("../models/user")
const router = Router()

//Get user route
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json({
        status: 200,
        data: user
    })
})

// Create route
router.post('/', async (req, res) => {
    const body = req.body
    const newUser = await User.create(body)
    res.json({
        status: 200,
        data: newUser
    })
})


// Update route - favorite
router.put('/favorite/:id', async (req, res) => {
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
router.put('/viewed/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    await Video.findByIdAndDelete(id)
    res.json({
        status: 200,
        msg: "Successfully deleted."
    })
})


module.exports = router