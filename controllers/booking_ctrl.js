import { bookingModel } from "../models/booking/booking_model.js";


export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate('car');
        const simplifiedBookings = bookings.map((booking) => ({
            carModel: booking.car.model,
            userFullName: booking.fullName,
            reservationDate: booking.reservationDate,
        }));
        return res.status(200).json({
            message: 'Success',
            data: bookings,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}





export const getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await bookingModel.find({ userId }).populate('car');
        return res.status(200).json({
            message: 'Success',
            data: bookings,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



export const addBooking = async (req, res) => {
    const {
        userId,
        fullName,
        mobile,
        email,
        Duration,
        car,
        from,
        to,
        reservationDate,
        comments,
        status,
    } = req.body;

    try {
        const newBooking = new bookingModel({
            userId,
            fullName,
            mobile,
            email,
            Duration,
            car,
            from,
            to,
            reservationDate,
            comments,
            status,
        });

        const savedBooking = await newBooking.save();
        return res.status(201).json(savedBooking);
    } catch (error) {
     return   res.status(500).json({ error: 'Failed to create a booking' });
    }
};


