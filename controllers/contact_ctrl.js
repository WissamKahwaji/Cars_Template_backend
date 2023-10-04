import { contactContentModel } from "../models/contact_us/contact_content_model.js";
import { contactModel } from "../models/contact_us/contact_us_model.js";




export const getContactData = async (req, res) => {
    try {
        const contactData = await contactModel.find().populate('content');
        return res.status(200).json({
            message: 'Success',
            data: contactData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}


export const addContactData = async (req, res) => {
    try {

        const { title, content } = req.body;

        const imgPath = req.files['img'][0].path;
        const urlImg = 'http://localhost:5000/' + imgPath.replace(/\\/g, '/');

        const newContent = new contactContentModel({
            number: content.number,
            location: content.location,
            email: content.email,
            phone: content.phone,
            whatsApp: content.whatsApp,
        });


        const savedContent = await newContent.save();


        const newContact = new contactModel({
            title,
            img: urlImg,
            content: savedContent._id,
        });


        const savedContact = await newContact.save();

        return res.status(201).json({
            message: 'Contact data created successfully',
            data: savedContact,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}


export const editContactData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;


        const contact = await contactModel.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }


        if (title) {
            contact.title = title;
        }


        if (content) {

            if (content.number) {
                contact.content.number = content.number;
            }
            if (content.location) {
                contact.content.location = content.location;
            }
            if (content.email) {
                contact.content.email = content.email;
            }
            if (content.phone) {
                contact.content.phone = content.phone;
            }
            if (content.whatsApp) {
                contact.content.whatsApp = content.whatsApp;
            }
        }


        const updatedContact = await contact.save();

        return res.status(200).json({
            message: 'Contact data updated successfully',
            data: updatedContact,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteContactData = async (req, res) => {
    try {
        const { id } = req.params;


        const contact = await contactModel.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const contactContentData = await contactContentModel.findByIdAndRemove(contact.content);

        await contact.remove();

        return res.status(200).json({
            message: 'Contact data deleted successfully',
            data: contact,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}