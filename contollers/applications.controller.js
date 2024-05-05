const md5 = require('md5');
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')
const {
    isValidURL,
    validatePassword,
    isValidEmail
} = require('../helper/functions');

const JOBS = require('../models/jobs');
const applicants = require('../models/applicants');
const { model } = require('mongoose');

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
    get: async (req, res) => {
        try{
            const { user_id } = req
            const { application_id } = req.params

            const record = await applicants.findOne({ where: { user_id: user_id, id: application_id } })

            if(!record)
                return res.status(404).json({ error: "Sorry!", details: [{ message: "You can not access this application" }] })

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
    getagainstjob: async (req, res) => {
        try{
            const { user_id } = req
            const { job_id } = req.params

            const record = await applicants.findAll({
                include: {
                    model: JOBS,
                    where: { created_by: user_id, job_id: job_id},
                    attributes: ['']
                },
            })

            if(!record)
                return res.status(404).json({ error: "Sorry!", details: [{ message: "You can not access this job`s applications" }] })

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