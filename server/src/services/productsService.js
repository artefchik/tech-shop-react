const ProductModel = require('../models/productModel');
const ProductDto = require('../dtos/productDto');

class ProductsService {
    static getProductDto(product) {
        return new ProductDto(product);
    }

    async getAll() {
        const products = await ProductModel.find();

        return products.map((product) => ProductsService.getProductDto(product));
    }

    async getOne(id) {
        console.log(id);
        const product = await ProductModel.findById(id);

        return ProductsService.getProductDto(product);
    }
}
module.exports = new ProductsService();
