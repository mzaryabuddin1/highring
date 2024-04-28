const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const jobs = sequelize.define('jobs', {
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    designation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    job_types: {
        type: DataTypes.STRING,
        allowNull: false
        // Full time, Part Time, Pcs Rate, Contract
    },
    job_location: {
        type: DataTypes.STRING,
        allowNull: true
        // Remote, Onsite
    },
    shift: {
        type: DataTypes.STRING,
        allowNull: true
    },
    working_hours: {
        type: DataTypes.STRING,
        allowNull: true
    },
    off_days: {
        type: DataTypes.STRING,
        allowNull: true
    },
    job_tenure: {
        type: DataTypes.STRING,
        allowNull: true
    },
    skills_requirement: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    experience_requirement: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    other_info: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    facilities: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
});

module.exports = jobs;
