const jwt = require('jsonwebtoken')
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')

const designations = require('../models/designations');

const userCtrl = {

    get: async (req, res) => {
        try {
            // 
            const { d_id } = req.query;
            const { id } = req.user;
            if (d_id) {
                const designationsData = await designations.findAll({
                    attributes: ['id', 'feild','designation_name', 'createdAt', 'updatedAt'],
                    where: {
                        status: 1,
                        created_by: id
                    }
                });
                return res.status(200).json({ success: 1, msg: "Fetched", designationsData })
            } else {
                const designationsData = await designations.findAll({
                    attributes: ['id', 'feild','designation_name', 'createdAt', 'updatedAt'],
                    where: {
                        status: 1,
                        is_approved: 1,
                    },
                    limit: 1000
                });
                return res.status(200).json({ success: 1, msg: "Fetched", designationsData })

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
    },
    pending: async (req, res) => {
        try {
            // 
            const { id } = req.user;

            const designationsData = await designations.findAll({
                attributes: ['id', 'feild','designation_name', 'createdAt', 'updatedAt'],
                where: {
                    status: 1,
                    is_approved: 0,
                    created_by: id

                },
                limit: 1000
            });
            return res.status(200).json({ success: 1, msg: "Fetched", designationsData })

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
    add_feild: async (req, res) => {
        try {
            const { name,feild } = req.body;
            
            const { id } = req.user;
            const newField = await designations.create({
                designation_name: name,
                feild: feild,
                created_by: id,
                is_approved: 0,
                status:1,
                user_type :'employer'

            });
            return res.status(201).json({ success: 1, msg: "Designation added successfully", newField });
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorMessages = err.errors.map(err => ({
                    message: err.message,
                }));
                return res.status(400).json({ error: "Validation error", details: errorMessages });
            }
            return res.status(500).json({ error: "Something Bad happened", details: [{ message: err.message }] });
        }
    },
    update_feild: async (req, res) => {
        try {
            // const { id } = req.user;
            const { id } = req.query;
            const { name,feild } = req.body;
          
            const updatedField = await designations.findOne({ where: { id } });
            if (!updatedField) {
                return res.status(404).json({ error: "Field not found" });
            }
            updatedField.designation_name = name;
            updatedField.feild = feild;
            updatedField.is_approved = 0;
            await updatedField.save();
            return res.status(200).json({ success: 1, msg: "Designation updated successfully", updatedField });
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorMessages = err.errors.map(err => ({
                    message: err.message,
                }));
                return res.status(400).json({ error: "Validation error", details: errorMessages });
            }
            return res.status(500).json({ error: "Something Bad happened", details: [{ message: err.message }] });
        }
    }


}


module.exports = userCtrl 