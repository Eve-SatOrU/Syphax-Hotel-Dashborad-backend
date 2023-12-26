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
const adminRoutes = require('./routes/admin');
app.use('/api', routes);
app.use('/api/admin', adminRoutes);



const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');
const roomController = require('./controllers/roomController');
const adminController = require('./controllers/adminController');

const User = require('./models/user');
const Booking = require('./models/Booking');
const Room = require('./models/Room');
// i think i will add admin model later 
const Admin = require('./models/admin');


// let's define the associations here
Booking.belongsTo(User, { foreignKey: 'userName' });
Booking.belongsTo(Room, { foreignKey: 'roomName' });
Room.hasMany(Booking, { foreignKey: 'roomName' });
User.hasMany(Booking, { foreignKey: 'userName' });


// sequelize.sync({force:true})
sequelize.sync()
.then(result => {
    app.listen(3000);
    console.log(
      "  ______                 ",
      " |  ____|                ",
      " | |__ __   __ ___       ",
      " |  __|\\ \\ / // _ \\   ",
      " | |____\\ V /|  __/     ",
      " |______|\\_/  \\___|    ",
      "",                                                              
    );
  })
.catch(err => {
    console.log(err);
});
