import jwt from 'jsonwebtoken';
import db from '../model/db';

class Authentication {
  /**
     * Generate token
     *
     * @param {*} user_id
     * @param {*} email
     * @param {*} is_admin
     */

  // eslint-disable-next-line camelcase
  static generateToken(user_id, email, is_admin) {
    const token = jwt.sign({ user_id, email, is_admin },
      process.env.SECRET_KEY, {
        expiresIn: '7d',
      });
    return token;
  }

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  static async verifyToken(req, res, next) {
    const token = req.headers;
    // check if token is provided
    if (!token) {
      res.status(403).json({
        status: 'error',
        error: 'Unauthorized, You are to login',
      });
    }

    try {
      // verify user provided token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      const text = 'SELECT * FROM users WHERE user_id = $1';
      const { rows } = await db.query(text, [decoded.user_id]);

      // check valid users
      if (!rows[0]) {
        return res.status(401).json({
          status: 'error',
          error: 'Token provided is invalid',
        });
      }

      req.user = decoded;
      return next();
    } catch (error) {
      if (error.name === 'expiredtoken') {
        return res.status(409).json({
          status: error,
          error: 'Token expired, Please log in',
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Ooops! Something went wrong. Contact our Engineers',
      });
    }
  }
}

export default Authentication;
