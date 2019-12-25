import express from 'express';
import category from './category';
import article from './article';

const router = express.Router();

router.use('/category', category);
router.use('/article', article);

export default router;
