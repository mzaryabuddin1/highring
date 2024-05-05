const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const app_users = sequelize.define('app_users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Phone number already exists.'
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validates: {
            isEmail: {
                msg: 'Please provide a correct email.'
            }
        }
    },
    alternate_email: {
        type: DataTypes.STRING,
        allowNull: true,
        validates: {
            isEmail: {
                msg: 'Please provide a correct alternate email.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    terms_and_conditions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Profile picture must be a valid URL.'
            }
        },
        defaultValue: 'https://performance.corral-labs.com/discoveryinflusence/male-facit.webp'
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otp_expired: {
        type: DataTypes.DATE,
        allowNull: true
    },
    otp_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
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
    documents: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null

    },
    cv: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null

    },
    city: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1

    },
    country: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1

    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    currency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1

    }
});

module.exports = app_users;
