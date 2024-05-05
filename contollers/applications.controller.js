const md5 = require('md5');
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')
const {
    isValidURL,
    validatePassword,
    isValidEmail
} = require('../helper/functions');

const JOBS = require('../models/jobs');
const applicants = require('../models/applicants');

const applicationsCtrl = {
    getAll: async (req, res) => {
        try{
            const { user_id } = req

            const record = await applicants.findAll({ where: { user_id: user_id } })

            return res.status(200).json({success: 1, msg: "Fetched", data: record})

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
}


module.exports = applicationsCtrl 