import mongoose from 'mongoose';



const bookingSchema = new mongoose.Schema({
    userId: String,
    fullName: String,
    mobile: String,
    email: String,
    Duration: String,
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    },
    from: String,
    to: String,
    reservationDate: Date,
    comments: String,
    status: String,
});



export const bookingModel = mongoose.model('Booking', bookingSchema);