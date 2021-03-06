/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTable = () => {
  // users
  // const Users = `CREATE TABLE IF NOT EXISTS
  // users (
  //   user_id SERIAL PRIMARY KEY,
  //   first_name VARCHAR (128) NOT NULL,
  //   last_name VARCHAR(128) NOT NULL,
  //   email VARCHAR (254) UNIQUE NOT NULL,
  //   password VARCHAR(128) NOT NULL,
  //   created_on DATE DEFAULT CURRENT_DATE,
  //   modified_on DATE NOT NULL,
  //   is_admin BOOLEAN NOT NULL DEFAULT ('FALSE')
  //  )`;

  // pool
  //   .query(Users)
  //   .then(res => {
  //     console.log(res);
  //     pool.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     pool.end();
  //   });

  // Trip
  // const Trips = `CREATE TABLE IF NOT EXISTS
  //   trip (
  //     trip_id SERIAL UNIQUE,
  //     bus_id SERIAL NOT NULL UNIQUE,
  //     origin VARCHAR(128) NOT NULL,
  //     destination VARCHAR(128) NOT NULL,
  //     trip_date DATE NOT NULL,
  //     fare FLOAT(4) NOT NULL,
  //     status VARCHAR(64) NOT NULL,
  //     created_on DATE DEFAULT CURRENT_DATE,
  //     modified_on DATE NOT NULL,
  //     PRIMARY KEY (trip_id, bus_id),
  //     FOREIGN KEY (bus_id) REFERENCES bus(bus_id)
  //   )`;

  // pool
  //   .query(Trips)
  //   .then(res => {
  //     console.log(res);
  //     pool.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     pool.end();
  //   });

  // Bus
  // const Bus = `CREATE TABLE IF NOT EXISTS
  //     bus (
  //       bus_id SERIAL PRIMARY KEY,
  //       number_plate VARCHAR(128) UNIQUE NOT NULL,
  //       manufacturer VARCHAR(128),
  //       model VARCHAR(128),
  //       year VARCHAR(128),
  //       capacity INTEGER NOT NULL,
  //       created_on DATE NOT NULL
  //       )`;

  // pool
  //   .query(Bus)
  //   .then(res => {
  //     console.log(res);
  //     pool.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     pool.end();
  //   });
  // Bookings
  const Bookings = `CREATE TABLE IF NOT EXISTS
    bookings (
      booking_id SERIAL PRIMARY KEY,
      user_id SERIAL NOT NULL,
      trip_id SERIAL NOT NULL,
      created_on DATE DEFAULT CURRENT_DATE,
      bus_id SERIAL NOT NULL,
      trip_date TIMESTAMP NOT NULL,
      seat_number INT NOT NULL,
      first_name VARCHAR (128) NOT NULL,
      last_name VARCHAR (128) NOT NULL,
      email VARCHAR (355) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (trip_id) REFERENCES trip(trip_id)
      )`;
  pool
    .query(Bookings)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log();
  process.exit(0);
});

module.exports = createTable;

require('make-runnable');
