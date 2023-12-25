
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const roomController = require('../controllers/roomController');
// i think i will put all routes here anyway lesss gooo

// admin routes



// user routes 
router.get('/',userController.getindex);
router.get('/register', userController.getRegister);
router.post('/register' , userController.postRegister);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.post('/logout', userController.postLogout);

// booking routes





// room routes
module.exports = router;