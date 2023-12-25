// your main app
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const cors = require('cors');

// env 
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: 'lol',
    resave: false,
    saveUninitialized: true,
  })
);
// cors 
app.use(cors());

const routes = require('./routes/routes');
app.use('/api', routes);

const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');
const roomController = require('./controllers/roomController');
const adminController = require('./controllers/adminController');

const User = require('./models/user');
const Booking = require('./models/Booking');
const Room = require('./models/Room');
// i think i will add admin model later 


// let's define the associations here
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });
Room.hasMany(Booking, { foreignKey: 'roomId' });
User.hasMany(Booking, { foreignKey: 'userId' });



sequelize.sync()
.then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
