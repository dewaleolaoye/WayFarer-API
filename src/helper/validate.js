/* eslint-disable camelcase */
import Joi from 'joi';

const validationOptions = {
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

class CheckForValidInput {
  /**
   * check user input during sign_up
   * @param {user} object
   */
  static createUser(user) {
    const schema = Joi.object().keys({
      first_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .required()
        .error(() => 'First name field is required with min length of 2 characters and must be alphabet'),
      last_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(2)
        .required()
        .error(() => 'last name field is required with min length of 2 characters and must be alphabet'),
      email: Joi.string().trim().strict().email()
        .required()
        .error(() => 'Valid email is required'),
      password: Joi.string().trim().strict().regex(/^\w{6,}$/)
        .required()
        .error(() => 'Password is required with minimum length of 6 characters'),
    });
    return Joi.validate(user, schema, validationOptions);
  }

  static login(login_details) {
    const schema = Joi.object().keys({
      email: Joi.string().trim().strict().email()
        .required()
        .error(() => 'Please input valid email'),
      password: Joi.string().trim().strict().regex(/^\w{6,}/)
        .required()
        .error(() => 'Password not correct'),
    });
    return Joi.validate(login_details, schema, validationOptions);
  }
}

export default CheckForValidInput;
