const createBusQuery = `INSERT INTO 
bus (number_plate, manufacturer, model, year, capacity, created_on) 
      VALUES($1, $2, $3, $4, $5, $6) 
      returning *`;

const busAvailability = 'SELECT * FROM trip WHERE (trip_date = $1 AND bus_id = $2 AND status = $3)';

// eslint-disable-next-line import/prefer-default-export
export { createBusQuery, busAvailability };
