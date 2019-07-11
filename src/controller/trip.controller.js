/* eslint-disable camelcase */
import db from '../model/db';
// import Authentication from '../middleware/Auth';
// import Helper from '../helper/Helper';
import { createBusQuery, createTripQuery, busAvailability } from '../model/trip.model';
// import user from '../controller/user.controller';

const Trip = {
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

    if (!number_plate || !capacity) {
      return res.status(400).json({
        status: 'error',
        error: 'Plate Number and Capacity is reaquired',
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
      const { rows } = await db.query(createBusQuery, values);
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
    } catch (error) {
      console.log(error);
      // console.log(error);
      // if (error.routine === '_bt_check_unique') {
      //   return res.status(409).json({
      //     status: 'error',
      //     error: 'Bus already exist',
      //   });
      // }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, contact our engineers',
      });
    }
  },

  /**
  * Admin can create trip
  * @param {object} req
  * @param {object} res
  * @returns {object} bus object
  */
  async createTrip(req, res) {
    // check if user is an Admin
    const values = [
      req.body.bus_id,
      new Date(),
      req.body.origin,
      req.body.destination,
      req.body.trip_date,
      req.body.fare,
      'active',
      new Date(),
    ];

    try {
      const bus = await db.query(busAvailability, [req.body.trip_date, req.body.bus_id, 'active']);
      if (bus.rows[0]) {
        return res.status(409).json({
          status: 'error',
          error: 'The bus has been schedule for another trip on the same date',
        });
      }
      const { rows } = await db.query(createTripQuery, values);
      return res.status(201).json({
        status: 'success',
        data: rows[0],
      });
    } catch (error) {
      console.log(error);
      if (error.routine === 'ri_ReportViolation') {
        return res.status(400).json({
          status: 'error',
          error: 'No bus with such ID found',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again or contact our engineers',
      });
    }
  },
};

export default Trip;
