/* eslint-disable camelcase */
const create_user = `INSERT INTO 
      users(first_name, last_name, email, password, created_on, modified_on, is_admin) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      returning *`;

const login_user = 'SELECT * FROM users WHERE email = $1';

export { create_user, login_user };
