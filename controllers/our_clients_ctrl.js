import { ourClientsModel } from "../models/our_clients/our_clients_model.js";



export const getOurClients = async (req, res) => {
    try {
        const clients = await ourClientsModel.find();
        return res.status(200).json({
            message: "Success",
            data: clients,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const addClient = async (req, res) => {
    try {
        const { title } = req.body;
        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
        const client = new ourClientsModel({
            img: urlImg,
            title: title,
        });
        await client.save();
        return res.status(201).json({
            message: "Client added successfully",
            data: client,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

export const editClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const updateFields = {};

        if (req.body.title) {
            updateFields.title = req.body.title;
        }

        if (req.body.img) {
            const imgPath = req.files['img'][0].path;
            const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');
            updateFields.img = urlImg;
        }

        const updatedClient = await ourClientsModel.findByIdAndUpdate(
            clientId,
            updateFields,
            { new: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({
            message: "Client updated successfully",
            data: updatedClient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params;


        const deletedClient = await ourClientsModel.findByIdAndRemove(clientId);

        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({
            message: "Client deleted successfully",
            data: deletedClient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};