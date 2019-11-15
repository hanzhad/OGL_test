/**
 *  <p>
 *    Throws error to frontend
 *  </p>
 * @param err
 * @param req
 * @param res
 * @param next
 */

export default (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  if (!err.code) {
    res.status(500).json(err.message);
  } else {
    res.status(err.code).json(err.message);
  }
};
