const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const jobs = sequelize.define('jobs', {
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feild: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    designation: {
        type: DataTypes.INTEGER,
        allowNull: false
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
