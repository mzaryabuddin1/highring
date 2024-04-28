const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const designations = sequelize.define('designations', {
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feild: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    designation_name: {
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

module.exports = designations;
