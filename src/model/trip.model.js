/* eslint-disable camelcase */
const create_trip_query = `INSERT INTO 
trip (bus_id, created_on, origin, destination, trip_date, fare, status, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning trip_id, bus_id, origin, destination, trip_date, fare, status`;

const get_all_trip_query = 'SELECT * FROM trip';
const bus_availability = 'SELECT * FROM trip WHERE (trip_date = $1 AND bus_id = $2 AND status = $3)';
const cancel_a_trip_query = 'UPDATE trip SET status=$1, modified_on=$2 WHERE trip_id=$3 returning *';
// eslint-disable-next-line import/prefer-default-export
export {
  create_trip_query,
  bus_availability,
  get_all_trip_query,
  cancel_a_trip_query,
};
