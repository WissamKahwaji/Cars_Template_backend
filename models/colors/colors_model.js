import mongoose from "mongoose";


const colorsModelSchema = new mongoose.Schema({
    mainColor: String,
    navColor: String,
});


export const ColorsModel = mongoose.model('Colors', colorsModelSchema);