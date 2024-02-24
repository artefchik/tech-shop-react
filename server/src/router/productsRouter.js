const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = new Router();

productsRouter.get('/products', ProductsController.getAll);

module.exports = productsRouter;
