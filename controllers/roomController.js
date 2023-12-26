// less goooo
// create room 
//View all rooms
// Book a room (changing its availability )

// create room
const Room = require("../models/Room"); 
const Booking = require("../models/Booking");

// create room without admin access or user in session
exports.getCreateRoom = (req,res,next) => {
    res.json({message: "Render create room form"});
}
exports.postCreateRoom = (req, res, next) => {
    const { roomName, type, capacity, available } = req.body;
    Room.create({
        roomName,
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
const { roomName } = req.params;
const { userName, status, startDay, endDay } = req.body;

try {
const room = await Room.findByPk(roomName);

if (!room) {
    return res.status(404).json({ error: 'Room not found.' });
}

if (room.available !== 'available') {
    return res.status(400).json({ error: 'Room is not available for booking.' });
}


const booking = await Booking.create({
userName,
roomName,
status,
startDay,
endDay,
});

res.status(200).json({ message: 'Room booked successfully', room, booking });

// Update room availability 
room.available = 'unavailable';
await room.save();

} catch (error) {
res.status(500).json({ error: error.message });
}
};
