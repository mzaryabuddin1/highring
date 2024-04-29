const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ledgers = sequelize.define('ledgers', {
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    },
    is_reached: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = ledgers;
