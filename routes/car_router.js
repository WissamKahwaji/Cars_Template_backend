import express from 'express';
import { addCarPageData, addCarRate, addCarToCategoryOne, addCarToCategoryThree, addCarToCategoryTwo, deleteCar, editCar, editCarPageData, editCarRate, getCarById, getCarPageData, getCarRate } from '../controllers/car_ctrl.js';


const router = express.Router();


router.get('/', getCarPageData);
router.post('/add-carPage', addCarPageData);
router.put('/edit-carPage/:id', editCarPageData);
router.get('/get-car-by-id/:id', getCarById);
router.post('/:id/add-car-to-cat-one', addCarToCategoryOne);
router.post('/:id/add-car-to-cat-two', addCarToCategoryTwo);
router.post('/:id/add-car-to-cat-three', addCarToCategoryThree);
router.put('/edit-car/:id', editCar);
router.delete('/:carPageId/delete-car/:id', deleteCar);
router.get('/get-car-rate/:id', getCarRate);
router.post('/add-car-rate/:id', addCarRate);
router.put('/edit-car-rate/:id', editCarRate);

export default router;