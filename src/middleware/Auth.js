import jwt from 'jsonwebtoken';
import { log } from 'util';
import db from '../model/db';

const Authentication = {
  /**
     * Generate token
     *
     * @param {*} user_id
     * @param {*} email
     * @param {*} is_admin
     */

  // eslint-disable-next-line camelcase
  generate_token(user_id, is_admin, email) {
    const token = jwt.sign({ user_id, is_admin, email },
      process.env.SECRET, {
        expiresIn: '24h',
      });
    return token;
  },

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  async verify_token(req, res, next) {
    const { token } = req.headers || req.headers.token;
    try {
      // verify user provided token
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE user_id = $1';
      const { rows } = await db.query(text, [decoded.user_id], [decoded.is_admin]);

      // check valid users
      if (!rows[0]) {
        return res.status(401).json({
          status: 'error',
          error: 'Token provided is invalid',
        });
      }

      req.user = decoded.user_id;
      req.admin = decoded.is_admin;

      return next();
    } catch (error) {
      log(error);
      // eslint-disable-next-line no-cond-assign
      if (error.name === 'tokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          error: 'Token Expired, request for a new one',
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Ooops! Something went wrong.',
      });
    }
  },
};

export default Authentication;
