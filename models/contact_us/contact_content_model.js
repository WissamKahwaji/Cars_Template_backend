import mongoose from "mongoose";



const contactContentSchema = new mongoose.Schema({
    number: String,
    location: String,
    email: String,
    phone: String,
    whatsApp: String,
});



export const contactContentModel = mongoose.model('contactContent', contactContentSchema);