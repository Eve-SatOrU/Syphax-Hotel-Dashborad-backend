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
Booking.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
Booking.belongsTo(Room, { foreignKey: 'roomNumber', targetKey: 'roomNumber', constraints: false });
Room.hasMany(Booking, { foreignKey: 'roomNumber', sourceKey: 'roomNumber', constraints: false });
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });

User.addHook('beforeDestroy', async (user, options) => {
// for delete associated bookings
  await Booking.destroy({ where: { userId: user.id } });
});
const PORT = process.env.PORT || 3000;

sequelize.sync()
.then(result => {
    app.listen(PORT);
    console.log(PORT);
  })
.catch(err => {
    console.log(err);
});
