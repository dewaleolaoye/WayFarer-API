// import Debug from 'debug';
// import createUser from '../model/user.model';
import db from '../model/db';
import Authentication from '../middleware/Auth';
import Helper from '../helper/Helper';

// const logger = new Debug('http');
const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 'error',
        error: 'Some values are missing',
      });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Please enter a valid email address',
      });
    }

    if (!Helper.hashPassword(req.body.password)) {
      return res.status(400).send({
        status: 'error',
        error: 'Password too short',
      });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hashPassword,
      new Date(),
      new Date(),
      false,
    ];

    const createUser = `INSERT INTO 
      users (first_name, last_name, email, password, created_on, modified_on, is_admin) 
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    try {
      const { rows } = await db.query(createUser, values);
      const token = Authentication.generateToken(rows[0].user_id);
      const {
        // eslint-disable-next-line camelcase
        user_id, email, first_name, last_name, is_admin,
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          user_id,
          first_name,
          last_name,
          email,
          is_admin,
          token,
        },
      });
    } catch (error) {
      // check if email already exist
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'User with the email already exist',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Oops! Something went wrong, try again',
      });
    }
  },

  /**
  * User login
  * @param {object} req
  * @param {object} res
  * @returns {object} user object
  */
  // eslint-disable-next-line consistent-return
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 'error',
        error: 'Some values are missing',
      });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Please enter a valid email address',
      });
    }

    const userLogin = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await db.query(userLogin, [req.body.email]);
      // console.log(rows[0]);
      if (!rows[0]) {
        res.status(404).send({
          status: 'error',
          error: 'User not found',
        });
      }

      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        res.status(400).send({
          status: 'error',
          error: 'Email or Password not correct',
        });
      }
      const {
        // eslint-disable-next-line camelcase
        user_id, first_name, email, is_admin,
      } = rows[0];
      // generate token
      const token = Authentication.generateToken(rows[0].user_id);

      return res.status(201).json({
        status: 'success',
        data: {
          user_id,
          first_name,
          email,
          is_admin,
          token,
        },
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: 'The credentials you provided is incorrect CATCH',
      });
    }
  },
};

export default User;
