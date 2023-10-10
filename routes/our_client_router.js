import express from 'express';
import { addClient, deleteClient, editClient, getOurClients } from '../controllers/our_clients_ctrl.js';



const router = express.Router();


router.get('/', getOurClients);
router.post('/add-client', addClient);
router.put('/edit-client/:clientId', editClient);
router.delete('/delete-client/:clientId', deleteClient);

export default router;