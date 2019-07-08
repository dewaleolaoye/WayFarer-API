const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  // eslint-disable-next-line comma-dangle
  connectionString: process.env.DATABASE_URL
});


/**
 * @param {Object} queryText
 * @param {Object} values
 * @returns {Promise} res or err
 */
function queryBuilder(queryText, values) {
  return new Promise((resolve, reject) => {
    pool.query(queryText, values)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default queryBuilder;
