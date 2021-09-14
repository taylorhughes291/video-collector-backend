////////////////////////////
// Boilerplate
////////////////////////////

require("dotenv").config()
const PORT = process.env.PORT
const NODE_ENV = "development"
const mongoose = require("./db/connection")
const cors = require('cors')
const corsOptions = require("./configs/cors.js")
const express = require('express')
const app = express()
const morgan = require('morgan')
const videosRouter = require("./controllers/videos")
const usersRouter = require("./controllers/users")
const auth = require("./auth")

////////////////////////////
// Middleware
////////////////////////////

NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); //logging

////////////////////////////
// Welcome route, router re-direct, and listen
////////////////////////////

// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Thank you for accessing the videos API!"
    })
})

// Router re-direct
app.use("/videos", videosRouter)
app.use("/users", usersRouter)

// Server listening
app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`)
})