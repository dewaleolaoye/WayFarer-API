/* eslint-disable camelcase */

const create_bus_query = `INSERT INTO 
bus (number_plate, manufacturer, model, year, capacity, created_on) 
      VALUES($1, $2, $3, $4, $5, $6) 
      returning bus_id, number_plate, capacity`;

const get_all_bus_query = 'SELECT * FROM bus';

export {
  create_bus_query,
  get_all_bus_query,
};
