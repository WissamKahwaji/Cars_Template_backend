import mongoose from "mongoose";


const ratesSchema = new mongoose.Schema({
    pageHeading: String,
    imgHeading: String,
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratesContent',
        }
    ],
    concellationPolicy: String,
});



export const ratesModel = mongoose.model('rates', ratesSchema);