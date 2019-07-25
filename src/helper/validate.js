/* eslint-disable camelcase */
import Joi from 'joi';

const validationOptions = {
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

class check_valid_input {
  /**
   * check user input for sign_up
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

  /**
    * check user input for login
    * @param {user} object
   */

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

  // number_plate, manufacturer, model, year, capacity,
  static add_bus(details) {
    const schema = Joi.object().keys({
      number_plate: Joi.string().trim().strict().regex(/^\w/)
        .required()
        .error(() => 'Number plate is required'),
      manufacturer: Joi.string().trim().strict().regex(/^\w/)
        .required()
        .error(() => 'Bus Manufacturer is required'),
      model: Joi.string().trim().strict()
        .required()
        .error(() => 'Bus model is required'),
      year: Joi.number().integer().min(1900).max(2030)
        .required()
        .error(() => 'Year is requrired with four digits'),
      capacity: Joi.number().integer().min(2).max(9999)
        .required()
        .error(() => 'Capacity is required with values not more than 9999'),
    });
    return Joi.validate(details, schema, validationOptions);
  }

  static trip(trip_details) {
    const schema = Joi.object().keys({
      bus_id: Joi.number().integer()
        .required()
        .error(() => 'Bus ID is required'),
      trip_date: Joi.string().strict().required()
        .error(() => 'Please specify trip date'),
      origin: Joi.string().strict().regex(/^\w/).required()
        .error(() => 'Specify trip origin'),
      destination: Joi.string().strict().regex(/^\w/)
        .required()
        .error(() => 'Specify trip destination'),
      fare: Joi.number().min(1).max(9999)
        .required()
        .error(() => 'Specify trip fare'),
    });
    return Joi.validate(trip_details, schema, validationOptions);
  }
}

export default check_valid_input;
