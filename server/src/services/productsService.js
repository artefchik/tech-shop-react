const ProductModel = require('../models/productModel');

class ProductsService {
    async getAll() {
        const products = await ProductModel.find();
        return products;
    }

    async getOne(id) {
        console.log(id);
        const product = await ProductModel.findById(id);
        return product;
    }
}
module.exports = new ProductsService();
