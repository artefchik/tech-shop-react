const { Router } = require('express');
const articleRouter = require('./articleRouter');
const userRouter = require('./userRouter');
const productsRouter = require('./productsRouter');

const router = new Router();

router.use('/articles', articleRouter);
router.use('/products', productsRouter);
router.use('', userRouter);

module.exports = router;
