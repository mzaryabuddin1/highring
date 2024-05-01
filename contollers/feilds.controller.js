const jwt = require('jsonwebtoken')
const { ValidationError, Op, Sequelize, QueryTypes, where } = require('sequelize')

const feilds = require('../models/feilds');

const userCtrl = {

    get: async (req, res) => {
        try {
            // 
            const { f_id } = req.query;
            const { id } = req.user;
            if (f_id) {
                const feildsData = await feilds.findAll({
                    attributes: ['id', 'feild_name', 'createdAt', 'updatedAt'],
                    where: {
                        status: 1,
                        created_by: id
                    }
                });
                return res.status(200).json({ success: 1, msg: "Fetched", feildsData })
            } else {
                const feildsData = await feilds.findAll({
                    attributes: ['id', 'feild_name', 'createdAt', 'updatedAt'],
                    where: {
                        status: 1
                    },
                    limit: 1000
                });
                return res.status(200).json({ success: 1, msg: "Fetched", feildsData })

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

            const feildsData = await feilds.findAll({
                attributes: ['id', 'feild_name', 'createdAt', 'updatedAt'],
                where: {
                    status: 1,
                    is_approved: 0,
                    created_by: id

                },
                limit: 1000
            });
            return res.status(200).json({ success: 1, msg: "Fetched", feildsData })

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
            const { name } = req.body;
            
            const { id } = req.user;
            const newField = await feilds.create({
                feild_name: name,
                created_by: id,
                is_approved: 0,
                status:1,
                user_type :'employer'

            });
            return res.status(201).json({ success: 1, msg: "Field added successfully", newField });
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
            const { name } = req.body;
          
            const updatedField = await feilds.findOne({ where: { id } });
            if (!updatedField) {
                return res.status(404).json({ error: "Field not found" });
            }
            updatedField.feild_name = name;
            updatedField.is_approved = 0;
            await updatedField.save();
            return res.status(200).json({ success: 1, msg: "Field updated successfully", updatedField });
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