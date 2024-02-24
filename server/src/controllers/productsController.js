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
}

module.exports = new ProductsController();
