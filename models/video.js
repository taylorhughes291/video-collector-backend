const {Schema, model} = require("mongoose")

// Video schema
const videoSchema = new Schema ({
    title: String,
    url: String,
    episodeType: String,
    episodeDate: Date
}, {timestamps: true})

//Publish the model
const Video = model('Video', videoSchema)

//export the published model
module.exports = Video