const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productsRouter = new Router();

productsRouter.get('/', ProductsController.getAll);
productsRouter.get('/:id', ProductsController.getOne);

module.exports = productsRouter;
