import mongoose from "mongoose";


const carPageSchema = new mongoose.Schema({
    pageHeading: String,
    descHeading: String,
    img: String,
    categoryOne: String,
    categoryTwo: String,
    categoryThree: String,
    categoryOneContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        }
    ],
    categoryTwoContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        }
    ],
    categoryThreeContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        }
    ],
    concellationPolicy: String,
});




export const carPageModel = mongoose.model('carPage', carPageSchema);