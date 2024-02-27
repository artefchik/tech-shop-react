const { Router } = require('express');
const articleRouter = require('./articleRouter');
const userRouter = require('./userRouter');
const productsRouter = require('./productsRouter');
const profileRouter = require('./profileRouter');
const basketRouter = require('./basketRouter');

const router = new Router();

router.use('/articles', articleRouter);
router.use('/profile', profileRouter);
router.use('/products', productsRouter);
router.use('/basket', basketRouter);
router.use('', userRouter);

module.exports = router;
