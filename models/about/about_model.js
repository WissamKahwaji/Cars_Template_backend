import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    pageHeading: String,
    descHeading: String,
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'aboutContentModel',
        }
    ],
});



export const aboutModel = mongoose.model('about', aboutSchema);