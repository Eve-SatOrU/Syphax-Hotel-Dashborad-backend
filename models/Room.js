const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Room = sequelize.define('Room', {
roomType:{
        type: DataTypes.ENUM('room', 'suite'),
        allowNull: false,
},    
roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
type: {
    type: DataTypes.STRING,
    allowNull: false,
},
capacity: {
    type: DataTypes.STRING,
    allowNull: false,
},
available: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
},
});

module.exports = Room;
