// alright creating booking is on roomControlllers nvm :"))
const Booking = require("../models/Booking");
const Room =require("../models/Room");
// Delete a booking
exports.deleteBooking = async (req, res, next) => {
    const { bookingId, roomNumber, roomType } = req.params;

    try {
        if (!bookingId || !roomNumber || !roomType) {
            return res.status(400).json({ error: "Booking ID, Room Number, or Room Type not provided" });
        }
        const deletedBooking = await Booking.destroy({
            where: { id: bookingId, roomNumber: roomNumber, roomType: roomType }
        });

        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        const room = await Room.findOne({ where: { roomNumber: roomNumber, roomType: roomType } });

        if (!room) {
            return res.status(404).json({ error: 'Room not found.' });
        }
        // Update room availability
        room.available = 'available';
        await room.save();

        return res.status(200).json({ message: "Booking deleted successfully and changed availability of room" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
// View bookings 
exports.viewBookings=async(req,res,next) =>{
    try{
        const bookings = await Booking.findAll();
        return res.status(200).json({message: "All bookings", bookings});
    }catch(err){
        console.log(err);
    }
}


// i didn't do admin session i will do it later inchllh :"))"