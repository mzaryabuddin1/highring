const employee_auth = (req, res, next) => {
    try {
        if(req.user_type != "employee")
            return res.status(401).json({ error: "You dont have rights to perform this action" })
        next()
    } catch (err) {
        return res.status(500).json({ error: "Validation error", details: [{ msg: err.message }] })
    }
}

module.exports = employee_auth

