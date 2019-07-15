/* eslint-disable camelcase */
const book_trip_query = `INSERT INTO 
bookings (user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING booking_id, user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email`;

const get_trip_query = 'SELECT * FROM trip WHERE trip_id = $1';
const find_user_query = 'SELECT * FROM users WHERE user_id = $1';
const check_booked_query = 'SELECT * FROM bookings WHERE (trip_id = $1 and user_id = $2)';


const get_all_admin_booking_query = 'SELECT * FROM bookings';
const get_all_user_booking_query = 'SELECT * FROM bookings WHERE user_id = $1';

export {
  book_trip_query,
  get_trip_query,
  find_user_query,
  check_booked_query,
  get_all_admin_booking_query,
  get_all_user_booking_query,
};
