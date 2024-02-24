const ProductModel = require('../models/productModel');

class ProductsService {
    async getAll() {
        const products = await ProductModel.find();
        return products;
    }
}
module.exports = new ProductsService();
