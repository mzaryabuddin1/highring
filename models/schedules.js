const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const schedules = sequelize.define('schedules', {
    applicant_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    schedule_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    time_zone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    other_information: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_reached: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = schedules;
