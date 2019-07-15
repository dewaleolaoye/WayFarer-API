import express from 'express';
import Bookings from '../controller/booking.controller';
import Authentication from '../middleware/Auth';

const router = express.Router();

router.post('/bookings', Authentication.verifyToken, Bookings.book_trip);

export default router;
