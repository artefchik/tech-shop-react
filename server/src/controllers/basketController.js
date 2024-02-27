const ApiError = require('../exceptions/apiError');
const BasketService = require('../services/basketService');

class BasketController {
    async addProduct(req, res, next) {
        try {
            const { id: basketId } = req.params;
            const { productId } = req.body;
            if (!basketId || !productId) {
                return next(ApiError.BadRequest(`не найдено`));
            }
            const addedProduct = await BasketService.addProduct({ basketId, productId });
            res.json(addedProduct);
        } catch (e) {
            return next(ApiError.BadRequest(`не найдено`));
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest(`не найдено`));
            }
            const deletedProduct = await BasketService.deleteProduct(id);
            res.json(deletedProduct);
        } catch (e) {
            return next(ApiError.BadRequest(`не найдено`));
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { count } = req.body;
            if (!id || !count) {
                return next(ApiError.BadRequest(`не найдено`));
            }
            const updatedProduct = await BasketService.updateCountProduct({ id, count });
            res.json(updatedProduct);
        } catch (e) {
            return next(ApiError.BadRequest(`не найдено`));
        }
    }

    async getProducts(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest(`не найдено`));
            }
            const products = await BasketService.getProducts(id);
            res.json(products);
        } catch (e) {
            return next(ApiError.BadRequest(`не найдено`));
        }
    }
}

module.exports = new BasketController();
