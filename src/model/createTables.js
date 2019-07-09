/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  // eslint-disable-next-line comma-dangle
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR (128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR (254) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    modified_on TIMESTAMP NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
   )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
};
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createUserTable,
  createAllTables,
  dropUserTable,
  dropAllTables,
};

require('make-runnable');
