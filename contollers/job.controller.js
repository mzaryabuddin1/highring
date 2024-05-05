const md5 = require('md5');
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')
const {
    isValidURL,
    validatePassword,
    isValidEmail
} = require('../helper/functions');
const app_users = require('../models/users');
const designations = require('../models/designations');
const feilds = require('../models/feilds');
const JOBS = require('../models/jobs');

const jobCtrl = {
    add: async (req, res) => {
        try{
            const { user_id } = req
            let { designation, job_types ,job_location, offer_price, shift,working_hours,off_days,job_tenure,skills_requirement ,experience_requirement,other_info ,facilities ,latitude,longitude } = req.body

            if(!designation, !job_types, !job_location, !offer_price, !skills_requirement, !latitude, !longitude){
                return res.status(400).json({ error: "Validation error", details: [{ message: "All fields required" }] })
            }

            job_location = JSON.stringify(job_location)
            job_types = JSON.stringify(job_types)
            off_days = JSON.stringify(off_days)
            shift = JSON.stringify(shift)
            skills_requirement = JSON.stringify(skills_requirement)
            facilities = JSON.stringify(facilities)

            const newJob = { created_by: user_id, designation, job_types ,job_location, offer_price, shift,working_hours,off_days,job_tenure,skills_requirement ,experience_requirement,other_info ,facilities ,latitude,longitude }

            const record = await JOBS.create(newJob)

            return res.status(200).json({success: 1, msg: "Created Successfully", data: record})

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
    get: async(req , res) => {
        try{

            const { job_id } = req.params

            const record = await JOBS.findOne({ where: { id: job_id } })
            if(!record) {
                return res.status(400).json({ error: "Validation error", details: [{ message: "No record found" }] })
            }

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
    getAll: async(req , res) => {
        try{


            const { user_id } = req

            const record = await JOBS.findAll({ where: { created_by: user_id } })

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
    update: async(req , res) => {
        try{


            const { user_id } = req
            const { job_id } = req.params

            const blockedKeys = ['is_approved', 'createdAt', 'created_by'];
            const hasBlockedKeys = Object.keys(req.body).some(key => blockedKeys.includes(key));
            if (hasBlockedKeys) {
                return res.status(400).json({ error: "Validation error", details: [{ message: "Such keys not allowed " + JSON.stringify(blockedKeys) }] });
            }

            const record = await JOBS.findOne({ where: { id: job_id, created_by: user_id } })

            if(!record)
                return res.status(404).json({ error: "Validation error", details: [{ message: "Job not found"}]})

            await record.update(req.body)

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
    }

}


module.exports = jobCtrl 