// less goooo

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
    const user = await User.findOne({
        where: {
          userName,
        },
      });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
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
userId: user.id, 

});

res.status(200).json({ message: 'Room booked successfully', room, booking });

// Update room availability 
room.available = 'unavailable';
await room.save();

} catch (error) {
res.status(500).json({ error: error.message });
}
};

// romove room also remove booking related with 
exports.deleteRoom = async (req, res) => {
    const { roomNumber, roomType } = req.params;
    try {
        const room = await Room.findOne({ where: { roomNumber, roomType } });

        if (!room) {
            return res.status(404).json({ error: `Room with number ${roomNumber} and type ${roomType} not found.` });
        }

        // Remove the room and its associated bookings
        await room.destroy({
            include: [{
                model: Booking,
                where: { roomNumber: room.roomNumber, roomType: room.roomType },
            }],
        });

        return res.status(200).json({ message: 'Room and associated bookings deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

