// this to connect our app in mySQL
const Sequelize = require('sequelize');
const sequelize = new Sequelize('hotel', 'root', '',
    {
        dialect: 'mysql',
        host: 'Localhost'
    });
module.exports = sequelize; 