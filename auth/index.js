const jwt = require("jsonwebtoken")


const auth = async (req, res, next) => {
    console.log("auth attempt")
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const payload = await jwt.verify(token, process.env.TOKEN_SECRET)

            if (payload) {
                req.payload = payload
                next()
            } else {
                res.json({
                    error: "VERIFICATION FAILED OR NO PAYLOAD",
                    status: 400
                })
            }
        } else {
            res.json({
                error: "NO AUTHORIZATION HEADER",
                status: 400
            })
        }
    } catch (error) {
        res.json({
            error, 
            msg: "AUTH ATTEMPT FAILURE",
            status: 400
        })
    }
}

module.exports = auth