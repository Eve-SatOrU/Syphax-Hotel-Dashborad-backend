const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Booking = sequelize.define('Booking', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


module.exports = Booking;
