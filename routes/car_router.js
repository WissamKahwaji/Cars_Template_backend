import express from 'express';
import { addCar, addCarPageData, addCarRate, deleteCar, editCar, editCarPageData, getCarPageData, getCarRate } from '../controllers/car_ctrl.js';


const router = express.Router();


router.get('/', getCarPageData);
router.post('/add-carPage', addCarPageData);
router.put('/edit-carPage/:id', editCarPageData);
router.post('/:id/add-car', addCar);
router.put('/edit-car/:id', editCar);
router.delete('/:carPageId/delete-car/:id', deleteCar);
router.get('/get-car-rate/:id', getCarRate);
router.post('/add-car-rate/:id', addCarRate);


export default router;