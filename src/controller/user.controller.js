/* eslint-disable camelcase */
import db from '../model/db';
import Authentication from '../middleware/Auth';
import Helper from '../helper/Helper';
import validate from '../helper/validate';
import { createUser, loginUser } from '../model/user.model';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create(req, res) {
    const {
      first_name, last_name, email, password,
    } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({
        status: 'error',
        error: 'All fields are required',
      });
    }

    if (!Helper.isValidEmail(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Please enter a valid email address',
      });
    }

    if (validate.passwordLength(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Password length too short',
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

    try {
      const { rows } = await db.query(loginUser, [req.body.email]);
      if (!rows[0]) {
        res.status(404).send({
          status: 'error',
          error: 'User not found',
        });
      }

      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        res.status(400).json({
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
        error: 'The credentials you provided is incorrect',
      });
    }
  },
};

export default User;
