/* eslint-disable camelcase */
import db from '../model/db';
// import Authentication from '../middleware/Auth';
// import Helper from '../helper/Helper';
import {
  createBusQuery,
  createTripQuery,
  busAvailability,
  getAllTripQuery,
  getAllBusQuery,
} from '../model/trip.model';
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
      if (error.routine === '_bt_check_unique') {
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
  * Admin can create trip
  * @param {object} req
  * @param {object} res
  * @returns {object} bus object
  */
  async createTrip(req, res) {
    // check if user is an Admin
    // eslint-disable-next-line object-curly-newline
    const { bus_id, origin, destination, trip_date, fare } = req.body;
    // eslint-disable-next-line prefer-const
    let { status } = req.body;

    if (status === null || status === 'undefined') {
      const newStatus = 'active';
      return newStatus;
    }

    // if (!(bus_id || origin || destination || destination || trip_date || fare)) {
    //   return res.status(400).json({
    //     status: 'error',
    //     error: 'All fields are required',
    //   });
    // }
    const values = [
      bus_id,
      new Date(),
      origin,
      destination,
      trip_date,
      fare,
      'active',
      new Date(),
    ];

    try {
      // check if bus is available
      const bus = await db.query(busAvailability, [trip_date, bus_id, 'active']);
      if (bus.rows[0]) {
        return res.status(409).json({
          status: 'error',
          error: 'The bus has been schedule for another trip on the same date',
        });
      }
      const { rows } = await db.query(createTripQuery, values);
      const { trip_id } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          trip_id,
          bus_id,
          origin,
          destination,
          trip_date,
          fare,
          status,
        },
      });
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        return res.status(400).json({
          status: 'error',
          error: 'No bus with such ID found',
        });
      }

      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 'error',
          error: 'Bus is Active, please use another',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again or contact our engineers',
      });
    }
  },
  /**
   * Both Admin and User see all trips
   * @param {object} req
   * @param {object} res
   * @returns {object} bus object
   */
  // eslint-disable-next-line consistent-return
  async getAllTrips(req, res) {
    try {
      const { rows } = await db.query(getAllTripQuery);
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      // console.log(error);
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
    try {
      const { rows } = await db.query(getAllBusQuery);
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default Trip;
