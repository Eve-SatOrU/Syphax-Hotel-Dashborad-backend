const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Booking = sequelize.define('Booking', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    status: {
        type: DataTypes.ENUM('pending', 'done', 'cancel','unverfied'), 
        defaultValue: 'unverfied', 
      },
    startDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    roomType: {
        type: DataTypes.ENUM('room', 'suite'),
        allowNull: false,
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});


module.exports = Booking;
