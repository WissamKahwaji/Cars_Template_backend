import express from 'express';
import { addAboutContent, addAboutData, addOrUpdateAnotherContent, deleteAboutContent, editAboutContent, editAboutData, getAboutData, getAnotherAboutData } from '../controllers/about_ctrl.js';




const router = express.Router();

router.get('/', getAboutData);
router.post('/add-about', addAboutData);
router.put('/edit-about/:id', editAboutData);
router.post('/:id/add-about-content', addAboutContent);
router.put('/edit-about-content/:id', editAboutContent);
router.delete('/:aboutId/delete-about-content/:id', deleteAboutContent);
router.get('/another-about', getAnotherAboutData);
router.post('/add-or-update', addOrUpdateAnotherContent);



export default router;