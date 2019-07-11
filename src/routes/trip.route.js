import express from 'express';
import Trip from '../controller/trip.controller';

const router = express.Router();

router.post('/trips/bus', Trip.addBus);
router.get('/trips/bus', Trip.getAllBus);
router.post('/trips', Trip.createTrip);
router.get('/trips', Trip.getAllTrips);

export default router;
