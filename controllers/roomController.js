// less goooo
// create room 
//View all rooms
// Book a room (changing its availability )

// create room
const Room = require("../models/Room"); 
const Booking = require("../models/Booking");
const User = require("../models/user");

// create room without admin access or user in session
exports.getCreateRoom = (req,res,next) => {
    res.json({message: "Render create room form"});
}
exports.postCreateRoom = (req, res, next) => {
    const { roomNumber, roomType, type, capacity, available } = req.body;
    Room.create({
        roomNumber,
        roomType,
        type,
        capacity,
        available,
    })
        .then((result) => {
        res.status(201).json({
            message: "Room created successfully",
            room: result,
        });
        })
        .catch((err) => {
        console.log(err);
        });
}
// view all rooms it's like i must add admin previlage here later
exports.getAllRooms = (req,res,next) => {
    Room.findAll()
    .then((result) => {
        res.status(200).json({
        message: "All rooms",
        rooms: result,
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

// Book a room (changing its availability ) and also add booking by admin also 
exports.bookRoomAndAddBooking = async (req, res) => {
const { roomType, roomNumber  } = req.params;
const { userName, status, startDay, endDay } = req.body;

try {
if (!['room', 'suite'].includes(roomType)) {
    return res.status(400).json({ error: 'Invalid room type. Choose either "room" or "suite".' });
}
    
const room = await Room.findOne({where: {
    roomType,
    roomNumber,},
});
if (!room) {
    return res.status(404).json({ error: `Room or suite with number ${roomNumber} not found.` });
}


if (room.available !== 'available') {
    return res.status(400).json({ error: 'Room is not available for booking.' });
}

// this to get all userName from db :) 
const users = await User.findAll();
const usernames = users.map(user => user.userName);

console.log(usernames);

if (!usernames.includes(userName)) {
    return res.status(400).json({ error: 'User not found.' });
}

const booking = await Booking.create({
userName,
status,
startDay,
endDay,
roomType: room.roomType, 
roomNumber: room.roomNumber, 

});

res.status(200).json({ message: 'Room booked successfully', room, booking });

// Update room availability 
room.available = 'unavailable';
await room.save();

} catch (error) {
res.status(500).json({ error: error.message });
}
};
