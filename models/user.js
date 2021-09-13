const {Schema, model} = require("mongoose")

// Video schema
const userSchema = new Schema ({
    username: String,
    favorites: {
        type: Array,
        default: []
    },
    episodesViewed: {
        type: Array,
        default: []
    }
}, {timestamps: true})

//Publish the model
const User = model('User', userSchema)

//export the published model
module.exports = User