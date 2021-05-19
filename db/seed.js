const seedVideos = require('./seedData.json')
const mongoose = require('./connection')
const Video = require('../models/video')
const db = mongoose.connection

Video.deleteMany({}).then(() => {
    Video.insertMany(seedVideos).then(db.close())
})