import express from 'express';
import category from './category';
import article from './article';
import recipe from './recipe';

const router = express.Router();

router.use('/category', category);
router.use('/article', article);
router.use('/recipe', recipe);

export default router;
