
const createBusQuery = `INSERT INTO 
bus (number_plate, manufacturer, model, year, capacity, created_on) 
      VALUES($1, $2, $3, $4, $5, $6) 
      returning bus_id, number_plate, capacity`;

const getAllBusQuery = 'SELECT * FROM bus';

export {
  createBusQuery,
  getAllBusQuery,
};
