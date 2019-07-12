/* eslint-disable consistent-return */
const validate = {

  passwordLength(password) {
    return /^\w{1,4}$/.test(password);
  },

};

export default validate;
