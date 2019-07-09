/* eslint-disable indent */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  // eslint-disable-next-line consistent-return
  hashPassword(password) {
    if (password.length > 4) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  // eslint-disable-next-line camelcase
  generateToken(id) {
    const token = jwt.sign({
      user_id: id,
    },
      process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
