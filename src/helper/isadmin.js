/* eslint-disable consistent-return */
// eslint-disable-next-line camelcase
const check_admin = {
  isadmin(req, res) {
    if (!req.is_admin || req.is_admin === false) {
      return res.status(409).json({
        status: 'errror',
        error: 'Unauthorized! Admin only',
      });
    }
  },
};

export default check_admin;
