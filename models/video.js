const {Schema, model} = require("mongoose")

// Video schema
const videoSchema = new Schema ({
    episodeType: String,
    title: String,
    episodeDate: Date,
    url: String
}, {timestamps: true})

//Publish the model
const Video = model('Video', videoSchema)

//export the published model
module.exports = Video