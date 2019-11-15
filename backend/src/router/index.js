import express from 'express';
import throwInternalError from '../utils/throwInternalError';

const router = express.Router();

router
  .route('/test')
  .get(
    throwInternalError(
      (req, res) => {
        res.send({
          name: 'test',
        });
      }
    )
  )
  .post(
    throwInternalError(
      () => {
        throw new Error('test error');
      }
    )
  );

export default router;
