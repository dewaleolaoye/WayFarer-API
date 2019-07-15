/* eslint-disable camelcase */
import moment from 'moment';
import { log } from 'util';
import db from '../model/db';
import {
  book_trip_query,
  get_trip_query,
  find_user_query,
} from '../model/booking.model';


const Bookings = {
  /**
     * Users can book a seat for a trip
     * @param {*} req
     * @param {*} res
     */
  async book_trip(req, res) {
    const { trip_id, seat_number } = req.body;
    try {
      const get_user = await db.query(find_user_query, [req.user]);
      const user = get_user.rows[0];

      const { rows } = await db.query(get_trip_query, [trip_id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found!',
        });
      }

      if (rows[0].status === 'canceled') {
        return res.status(400).json({
          status: 'error',
          error: 'This trip has been canceled, you can not book it',
        });
      }

      // const userBookings = await db.query(checkIfBookingExistQuery,
      //   [rows[0].trip_id, req.user.user_id]);
      // if (userBookings.rows[0]) {
      //   return res.status(400).json({
      //     status: 'error',
      //     error: 'You already booked a seat for the trip',
      //   });
      // }

      const values = [
        req.user,
        trip_id,
        moment(new Date()),
        rows[0].bus_id,
        rows[0].trip_date,
        seat_number,
        user.first_name,
        user.last_name,
        user.email,
      ];

      const booking = await db.query(book_trip_query, values);
      return res.status(201).json({
        status: 'success',
        data: booking.rows[0],
      });
    } catch (errors) {
      log(errors);

      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  },
};

export default Bookings;
