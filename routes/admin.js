const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const roomController = require('../controllers/roomController');
const adminController = require('../controllers/adminController');
// i think i will put all routes here anyway lesss gooo

// admin routes
//register admin
router.get('/register' ,adminController.getAdminRegistration);
router.post('/register' ,adminController.postAdminRegistration);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.post('/logout',adminController.postLogout);
router.get('/dashboard', adminController.getDashboard);

router.post('/delete-user/:id', adminController.deleteUser);

// room stuff
router.get('/createRoom', roomController.getCreateRoom);
router.post('/createRoom', roomController.postCreateRoom);
router.get('/rooms', roomController.getAllRooms);
router.post('/rooms/:roomType/:roomNumber/bookings', roomController.bookRoomAndAddBooking);
router.post('/deleteRoom/:roomType/:roomNumber', roomController.deleteRoom);

// booking stuff
router.get('/bookings', bookingController.viewBookings);
router.post('/deleteBooking/:roomType/:roomNumber/:bookingId', bookingController.deleteBooking);
router.post('/bookings/:bookingId/change-status', bookingController.updateBooking);

// top users
router.get('/top-users', adminController.getTopUsers);
module.exports = router;