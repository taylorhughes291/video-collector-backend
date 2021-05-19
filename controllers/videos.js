const Video = require("../models/video")
const {Router} = require('express')
const { findByIdAndUpdate } = require("../models/video")
const router = Router()
const videos = require('../db/seedData.json')

//seed route
router.get('/seed', async (req, res) => {
    await Video.deleteMany({})
    await Video.insertMany(videos)
    res.json({
        status: 200,
        message: "Successfully seeded database"
    })
})

//index route
router.get('/', async (req, res) => {
    const videos = await Video.find({})
    res.json({
        status: 200,
        data: videos
    })
})

// Create route
router.post('/', async (req, res) => {
    const body = req.body
    const newVideo = await Video.create(body)
    res.json({
        status: 200,
        data: newVideo
    })
})


// Update route
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updatedVideo = await Video.findByIdAndUpdate(id, body, {new: true})
    res.json({
        status: 200,
        data: updatedVideo
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