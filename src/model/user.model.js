const createUser = `INSERT INTO 
      users(first_name, last_name, email, password, is_admin, created_on, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      returning *`;

export {
  // eslint-disable-next-line import/prefer-default-export
  createUser,
};
