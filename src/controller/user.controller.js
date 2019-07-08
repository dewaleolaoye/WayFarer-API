/* eslint-disable no-console */
// import Debug from 'debug';
import db from '../model/db';
// import createUser from '../model/user.model';
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
      return res.status(400).send({ message: 'Some values are missing' });
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
      console.log(rows);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};

export default User;
