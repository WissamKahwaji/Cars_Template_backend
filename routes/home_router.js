import express from 'express';
import { addHomeData, editHomeData, getHomeData } from '../controllers/home_ctrl.js';



const router = express.Router();


router.get('/', getHomeData);
router.post('/add-home-data', addHomeData);
router.put('/edit-home-data/:id', editHomeData);


export default router;