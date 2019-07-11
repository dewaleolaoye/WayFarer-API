const createUser = `INSERT INTO 
      users(first_name, last_name, email, password, created_on, modified_on, is_admin) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      returning *`;

const loginUser = 'SELECT * FROM users WHERE email = $1';

export { createUser, loginUser };
