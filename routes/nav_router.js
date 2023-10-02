import express from 'express';
import { addNavData, editNavData, getNavData } from '../controllers/nav_ctrl.js';



const router = express.Router();

router.get('/', getNavData);
router.post('/add', addNavData);
router.put('/edit/:id', editNavData);

export default router;