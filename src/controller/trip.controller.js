import db from '../model/db';
// import Authentication from '../middleware/Auth';
// import Helper from '../helper/Helper';
import { createBusQuery } from '../model/trip.model';
// import user from '../controller/user.controller';

const Trip = {
  /**
* add bus
* @param {object} req
* @param {object} res
* @returns {object} bus object
*/
  async addBus(req, res) {
    // if (req.body.is_admin === false) {
    //   return res.status(403).json({
    //     status: 'error',
    //     error: 'Unauthorized!, Admin only',
    //   });
    // }

    const values = [
      req.body.number_plate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      new Date(),
    ];

    try {
      const { rows } = await db.query(createBusQuery, values);
      // const {
      //   // eslint-disable-next-line camelcase
      //   bus_id, number_plate, manufacturer, model, year, capacity,
      // } = rows[0];
      return res.status(201).json({
        status: 'suceess',
        data: rows[0],
      });
    } catch (error) {
      // console.log(error);
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
};

export default Trip;
