import mongoose from "mongoose";


const ourClientsSchema = new mongoose.Schema({
    img: String,
    title: String,
});



export const ourClientsModel = mongoose.model('ourClients', ourClientsSchema);