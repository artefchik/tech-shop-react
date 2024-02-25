const ApiError = require('../exceptions/apiError');
const productsService = require('../services/productsService');

class ProductsController {
    async getAll(req, res, next) {
        try {
            const products = await productsService.getAll();
            return res.json(products);
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest(''));
            }
            const product = await productsService.getOne(id);
            return res.json(product);
        } catch (e) {
            return next(ApiError.BadRequest(''));
        }
    }
}

module.exports = new ProductsController();
