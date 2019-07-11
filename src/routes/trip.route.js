import express from 'express';
import Trip from '../controller/trip.controller';

const router = express.Router();

router.post('/trips', Trip.createTrip);
router.post('/trips/bus', Trip.addBus);

export default router;
