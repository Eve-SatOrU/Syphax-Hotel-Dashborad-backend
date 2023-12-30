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
// now adding change status of booking 
exports.updateBooking = async (req, res, next) => {
    const { bookingId } = req.params;
    const { newStatus } = req.body;

    try {
        if (!bookingId) {
            return res.status(400).json({ error: "Booking ID not provided" });
        }
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        if (newStatus === 'cancel' && booking.roomNumber && booking.roomType) {
            const room = await Room.findOne({
                where: {
                    roomNumber: booking.roomNumber,
                    roomType: booking.roomType,
                },
            });

            if (room) {
                console.log('Updating Room Availability for Room Number:', room.roomNumber);
                room.available = 'available';
                await room.save();
                console.log('Room Availability Updated:', room.available);
            }
        }
        booking.status = newStatus;
        await booking.save();
        return res.status(200).json({ message: "Booking updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// i didn't do admin session i will do it later inchllh :"))"