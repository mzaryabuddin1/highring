const jwt = require('jsonwebtoken')
const md5 = require('md5');
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')
const {
    isValidURL,
    validatePassword,
    isValidEmail
} = require('../helper/functions');
const app_users = require('../models/users');

const userCtrl = {
    add: async (req, res) => {
        try {
            const { first_name, last_name, phone, email, alternate_email, password, terms_and_conditions, user_type } = req.body

            if (!first_name || !last_name || !phone || !password || !terms_and_conditions || !user_type )
                return res.status(400).json({ error: "Validation error", details: [{ message: "All fields required" }] })

            if (!validatePassword(password))
                return res.status(400).json({ error: "Validation error!", details: [{ message: "Password must be atleast 6 Characters long, contains captial Letter and special character." }] })

            // Validate phone number as MSISDN
            const msisdnRegex = /^\+?[1-9]\d{1,14}$/; // Regex for MSISDN format
            if (!msisdnRegex.test(phone))
                return res.status(400).json({ error: "Validation error", details: [{ message: "Invalid phone number format" }] });

            const passwordHash = md5(password)

            const newUser = { first_name, last_name, phone, email, alternate_email, password: passwordHash, terms_and_conditions, user_type }

            const record = await app_users.create(newUser)

            const access_token = createAccessToken({ id: record.id })
            
            return res.status(200).json({success: 1, msg: "Created Successfully", access_token})

        } catch (err) {
            if (err instanceof ValidationError) {
                const errorMessages = err.errors.map(err => ({
                    message: err.message,
                }));
                return res.status(400).json({ error: "Validation error", details: errorMessages });
            }

            return res.status(500).json({ error: "Something Bad happened", details: [{ message: err.message }] })
        }
    },
    get: async (req, res) => {
        try {
            const { id } = req.user
            
            const data = await app_users.findOne({ where : { id }, attributes : ["first_name", "last_name", "phone", "email", "alternate_email", "profile_picture", "user_type", "id"] })
            
            return res.status(200).json({success: 1, msg: "Fetched", data})

        } catch (err) {
            if (err instanceof ValidationError) {
                const errorMessages = err.errors.map(err => ({
                    message: err.message,
                }));
                return res.status(400).json({ error: "Validation error", details: errorMessages });
            }

            return res.status(500).json({ error: "Something Bad happened", details: [{ message: err.message }] })
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userCtrl 