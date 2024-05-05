const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const applicants = require('./applicants');

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
        allowNull: false
        // Remote, Onsite
    },
    offer_price: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
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
    reject_reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

jobs.associate = models => {
    jobs.hasMany(models.applicants, { foreignKey: 'user_id', as: 'applicants' });
};

module.exports = jobs;
