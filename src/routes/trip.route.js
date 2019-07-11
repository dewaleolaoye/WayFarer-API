import express from 'express';
import Trip from '../controller/trip.controller';

const router = express.Router();

router.post('/trips/bus', Trip.addBus);
// router.post('/signin', User.login);

export default router;
