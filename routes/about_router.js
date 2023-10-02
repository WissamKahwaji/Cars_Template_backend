import express from 'express';
import { addAboutContent, addAboutData, deleteAboutContent, editAboutContent, editAboutData, getAboutData } from '../controllers/about_ctrl.js';




const router = express.Router();

router.get('/', getAboutData);
router.post('/add-about', addAboutData);
router.put('/edit-about/:id', editAboutData);
router.post('/:id/add-about-content', addAboutContent);
router.put('/edit-about-content/:id', editAboutContent);
router.delete('/:aboutId/delete-about-content/:id', deleteAboutContent);


export default router;