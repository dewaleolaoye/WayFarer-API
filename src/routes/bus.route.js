import express from 'express';
import Bus from '../controller/bus.controller';
import Authentication from '../middleware/Auth';

const router = express.Router();

router.post('/trips/bus', Authentication.verifyToken, Bus.addBus);
router.get('/trips/bus', Authentication.verifyToken, Bus.getAllBus);

export default router;
