import express from 'express';
import { addColors, getColors } from '../controllers/colors_ctrl.js';


const router = express.Router();


router.get('/', getColors);
router.post('/add-colors', addColors);



export default router;