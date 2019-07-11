const createTripQuery = `INSERT INTO 
trip (bus_id, created_on, origin, destination, trip_date, fare, status, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning trip_id, bus_id, origin, destination, trip_date, fare, status`;

const createBusQuery = `INSERT INTO 
bus (number_plate, manufacturer, model, year, capacity, created_on) 
      VALUES($1, $2, $3, $4, $5, $6) 
      returning *`;

// eslint-disable-next-line import/prefer-default-export
export { createTripQuery, createBusQuery };
