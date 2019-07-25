/* eslint-disable camelcase */
import db from '../model/db';
import { create_bus_query, get_all_bus_query } from '../model/bus.model';
import check_valid_input from '../helper/validate';

const Bus = {
  /**
* Admin can add bus
* @param {object} req
* @param {object} res
* @returns {object} bus object
*/

  async addBus(req, res) {
    const {
      number_plate, manufacturer, model, year, capacity,
    } = req.body;

    const { error } = check_valid_input.add_bus(req.body);
    if (error) {
      return res.status(422).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    const values = [
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
      new Date(),
    ];
    try {
      if (!req.user.is_admin) {
        return res.status(403).json({
          status: 'error',
          error: 'Unauthorized!',
        });
      }
      const { rows } = await db.query(create_bus_query, values);
      const { bus_id } = rows[0];

      return res.status(201).json({
        status: 'suceess',
        data: {
          bus_id,
          number_plate,
          manufacturer,
          model,
          year,
          capacity,
        },
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Bus already exist',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, contact our engineers',
      });
    }
  },

  /**
    * Admin can see all buses
    * @param {object} req
    * @param {object} res
    * @returns {object} bus object
    */
  // eslint-disable-next-line consistent-return
  async getAllBus(req, res) {
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized!',
      });
    }
    try {
      const { rows } = await db.query(get_all_bus_query);
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, contact our engineers',
      });
    }
  },
};

export default Bus;
