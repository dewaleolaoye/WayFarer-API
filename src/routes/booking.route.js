import express from 'express';
import Bookings from '../controller/booking.controller';
import Authentication from '../middleware/Auth';

const router = express.Router();

router.post('/bookings', Authentication.verifyToken, Bookings.book_trip);
router.get('/bookings/:booking_id', Authentication.verifyToken, Bookings.get_user_booking);

export default router;
