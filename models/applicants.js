const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const applicants = sequelize.define('applicants', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary_expected: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    other_comments: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'accepted', 'rejected']],
                msg: 'Invalid status.'
            }
        }
    },
    is_hired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    employer_feedback: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employee_feedback: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employer_star: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        minValue: 1,
        maxValue: 5,
        allowNull: true
    },
    employee_star: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        minValue: 1,
        maxValue: 5,
        allowNull: true
    },
});

module.exports = applicants;
