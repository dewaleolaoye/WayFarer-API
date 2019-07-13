const createTripQuery = `INSERT INTO 
trip (bus_id, created_on, origin, destination, trip_date, fare, status, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning trip_id, bus_id, origin, destination, trip_date, fare, status`;

const getAllTripQuery = 'SELECT * FROM trip';


const busAvailability = 'SELECT * FROM trip WHERE (trip_date = $1 AND bus_id = $2 AND status = $3)';

// eslint-disable-next-line import/prefer-default-export
export {
  createTripQuery,
  busAvailability,
  getAllTripQuery,
};
