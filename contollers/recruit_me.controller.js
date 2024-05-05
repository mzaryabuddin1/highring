const jwt = require('jsonwebtoken')
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')

const user_jobs = require('../models/jobs');

// [Op.and]: Sequelize.literal(`
// ST_Distance_Sphere(
//     POINT(latitude, longitude),
//     POINT(${latitude}, ${longitude})
// ) <= ${radius * 1000} -- converting radius from kilometers to meters
// `)
const userCtrl = {

    get: async (req, res) => {
        try {
            // 
            // const { id } = req.user
            const { latitude, longitude, id } = req.query;
            if (id) {
                const jobs = await user_jobs.findAll({
                    attributes: ['id', 'skills_requirement', 'latitude', 'longitude', 'job_types', 'job_location', 'shift', 'working_hours', 'off_days', 'job_tenure', 'experience_requirement', 'other_info', 'facilities'],
                    where: {
                        status: 1, // Filter by status = 1
                        id: id
                    }
                });
                return res.status(200).json({ success: 1, msg: "Fetched", jobs })

            } else {
                if (!latitude || !longitude )
                    return res.status(400).json({ error: "Validation error", details: [{ message: "All fields required" }] })

                const radius = 5; // in kilometers
                const jobs = await user_jobs.findAll({
                    attributes: ['id', 'skills_requirement', 'latitude', 'longitude', 'job_types', 'job_location', 'shift', 'working_hours', 'off_days', 'job_tenure', 'experience_requirement', 'other_info', 'facilities'],
                    where: {
                        status: 1
                    },
                    order: [
                        [Sequelize.literal(`SQRT(POW((latitude - ${latitude}), 2) + POW((longitude - ${longitude}), 2))`), 'ASC']
                    ],
                    limit: 1000
                });
                return res.status(200).json({ success: 1, msg: "Fetched", jobs })

            }



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


module.exports = userCtrl 