import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    pageHeading: String,
    descHeading: String,
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'serviceContent',
        }
    ],
});


export const serviceModel = mongoose.model('services', serviceSchema);