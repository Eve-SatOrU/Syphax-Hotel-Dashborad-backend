const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Booking = sequelize.define('Booking', {
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
    }
});


module.exports = Booking;
