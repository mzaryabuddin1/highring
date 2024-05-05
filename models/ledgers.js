const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const users = require('./users');
const schedules = require('./schedules');

const ledgers = sequelize.define('ledgers', {
    user_type: {
        type: DataTypes.ENUM('employee', 'employer'),
        allowNull: true,
        validate: {
            isIn: {
                args: [['employee', 'employer']],
                msg: 'Invalid user type.'
            }
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dated: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    transaction_type: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = ledgers;
