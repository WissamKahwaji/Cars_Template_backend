import express from "express";
import { addContactData, deleteContactData, editContactData, getContactData } from "../controllers/contact_ctrl.js";




const router = express.Router();

router.get('/', getContactData);
router.post('/add-contact-data', addContactData);
router.put('/edit-contact-data/:id', editContactData);
router.delete('/delete-contact-data/:id', deleteContactData);


export default router;