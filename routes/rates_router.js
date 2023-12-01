import express from "express";
import { addCarToRates, addRatesContent, addRatesData, deleteRatesContent, editRatesContent, editRatesData, getRatesData, removeCarsFromRates } from "../controllers/rates_ctrl.js";


const router = express.Router();


router.get('/', getRatesData);
router.post('/add-rates', addRatesData);
router.put('/edit-rate/:id', editRatesData);
router.post('/:id/add-rate-content', addRatesContent);
router.put('/edit-rate-content/:id', editRatesContent);
router.delete('/:rateId/delete-rate-content/:id', deleteRatesContent);
router.put('/add-cars', addCarToRates);
router.put('/remove-cars', removeCarsFromRates);

export default router;