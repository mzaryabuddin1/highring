const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const feilds = sequelize.define('feilds', {
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feild_name: {
        type: DataTypes.STRING,
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
    },
    user_type: {
        type: DataTypes.ENUM('admin', 'employer'),
        allowNull: true,
        validate: {
            isIn: {
                args: [['admin', 'employer']],
                msg: 'Invalid user type.'
            }
        }
    }
});

module.exports = feilds;
