const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = new Router();

productsRouter.get('/products', ProductsController.getAll);
productsRouter.get('/products/:id', ProductsController.getOne);

module.exports = productsRouter;
