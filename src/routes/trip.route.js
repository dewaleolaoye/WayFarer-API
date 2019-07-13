import express from 'express';
import Trip from '../controller/trip.controller';
import Authentication from '../middleware/Auth';

const router = express.Router();


router.post('/trips', Authentication.verifyToken, Trip.createTrip);
router.get('/trips', Authentication.verifyToken, Trip.getAllTrips);

export default router;
