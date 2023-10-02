import mongoose from "mongoose";


const carPageSchema = new mongoose.Schema({
    pageHeading: String,
    descHeading: String,
    img: String,
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        }
    ]
});




export const carPageModel = mongoose.model('carPage', carPageSchema);