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
  const Users = `CREATE TABLE IF NOT EXISTS 
  users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR (128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR (254) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    modified_on TIMESTAMP NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
   )`;

  pool.query(Users).then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });

  // Bus
  const Bus = `CREATE TABLE IF NOT EXISTS
  bus (
    bus_id SERIAL PRIMARY KEY,
    number_plate VARCHAR(128),
    manufacturer VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    year VARCHAR(128) NOT NULL,
    capacity INT NOT NULL,
    created_on TIMESTAMP NOT NULL
    )`;

  pool.query(Bus).then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });

  // Trip
  const Trip = `CREATE TABLE IF NOT EXISTS 
  trip (
    trip_id SERIAL PRIMARY KEY,
    bus_id SERIAL NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    fare FLOAT(4) NOT NULL,
    status VARCHAR(64) NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    modified_on TIMESTAMP NOT NULL
  )`;

  pool.query(Trip).then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = createTable;

require('make-runnable');
