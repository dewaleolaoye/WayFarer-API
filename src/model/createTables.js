import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  // eslint-disable-next-line comma-dangle
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

const createTables = () => {
  // User database model
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
  // eslint-disable-next-line arrow-parens
  pool.query(Users).catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });
};

pool.on('remove', () => {
  // eslint-disable-next-line no-console
  console.log('client removed');
  process.exit(0);
});

module.exports = createTables;

require('make-runnable');
