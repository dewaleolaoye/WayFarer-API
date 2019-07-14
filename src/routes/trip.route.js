import express from 'express';
import Trip from '../controller/trip.controller';
import Authentication from '../middleware/Auth';

const router = express.Router();

router.post('/trips', Authentication.verifyToken, Trip.createTrip);
router.get('/trips', Authentication.verifyToken, Trip.getAllTrips);
router.patch('/trips/:trip_id', Authentication.verifyToken, Trip.cancelATrip);

export default router;
