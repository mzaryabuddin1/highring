const jwt = require('jsonwebtoken');
const app_users = require('../models/users');

const appauth = (req, res, next) => {
    try {

        // Check if the Authorization header exists in the request
        if (!req.headers || !req.headers.authorization) { return res.status(401).json({ error: "Validation error", details: [{ message: "Invalid Authentication" }] }) }

        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;

        // Split the header value to separate the token
        const token = authHeader.split(' ')[1]; // Assuming Bearer token is used

        // const token = req.cookies.access_token
        if (!token)
            return res.status(401).json({ error: "Validation error", details: [{ msg: "Invalid Authentication" }] })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err)
                return res.status(401).json({ error: "Validation error", details: [{ msg: "Invalid Authentication" }] })

            req.user = user
            const { id } = user

            // Find the user record based on the _id from the token
            try {
                const record = await app_users.findOne({ where: { id } })
                if (!record) 
                    return res.status(401).json({ error: "User not found" });

                if (!record.status)
                    return res.status(401).json({ error: "User deactivated, Please contact with administrator!" });

                next();
            } catch (err) {
                return res.status(500).json({ error: "Validation error", details: [{ msg: "Server Error" }] })
            }

        })
    } catch (err) {
        return res.status(500).json({ error: "Validation error", details: [{ msg: err.message }] })
    }
}

module.exports = appauth

