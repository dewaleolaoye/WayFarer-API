/* eslint-disable camelcase */
import db from '../model/db';
import Authentication from '../middleware/Auth';
import Helper from '../helper/Helper';
import { create_user, login_user } from '../model/user.model';
import CheckForValidInput from '../helper/validate';

const User = {
  /**
   * User signup
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async create(req, res) {
    const {
      first_name, last_name, email,
    } = req.body;

    let { is_admin } = req.body;
    // eslint-disable-next-line no-unused-expressions
    !is_admin ? is_admin = false : true;

    const { error } = CheckForValidInput.createUser(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const hash_password = Helper.hash_password(req.body.password);

    const values = [
      first_name,
      last_name,
      email,
      hash_password,
      new Date(),
      new Date(),
      is_admin,
    ];

    try {
      const { rows } = await db.query(create_user, values);
      // eslint-disable-next-line no-shadow
      const { user_id } = rows[0];
      const token = Authentication.generate_token(rows[0].user_id, rows[0].is_admin, rows[0].email);

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
    } catch (err) {
      // console.log(err);
      // check if email already exist
      if (err.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'User with the email already exist',
        });
      }
      return res.status(500).json({
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
  async login(req, res) {
    // eslint-disable-next-line no-console
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 'error',
        error: 'Some values are missing',
      });
    }

    // if (!validate.isValidEmail(req.body.email)) {
    //   return res.status(400).json({
    //     status: 'error',
    //     error: 'Please enter a valid email address',
    //   });
    // }

    try {
      const { rows } = await db.query(login_user, [req.body.email]);
      if (!rows[0]) {
        res.status(401).json({
          status: 'error',
          error: 'Some values are missing',
        });
      }

      if (!Helper.compare_password(rows[0].password, req.body.password)) {
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
      const token = Authentication.generate_token(rows[0].user_id, is_admin, email);
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
      return res.status(401).json({
        status: 'error',
        error: 'The credentials you provided is incorrect',
      });
    }
  },
};

export default User;
