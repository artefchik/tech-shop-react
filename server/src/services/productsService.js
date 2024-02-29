const ProductModel = require('../models/productModel');
const ProductDto = require('../dtos/productDto');

class ProductsService {
    static getProductDto(product) {
        return new ProductDto(product);
    }

    async getAll(query) {
        const { category } = query;
        // let products;
        const limit = query.limit ?? 3;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'price.current';
        // if (category === 'all') {
        //     products = await ProductModel.find()
        //         .skip(page * limit - limit)
        //         .limit(limit)
        //         .sort({ [sort]: order });
        // } else {
        //     products = await ProductModel.find({ category })
        //         .skip(page * limit - limit)
        //         .limit(limit)
        //         .sort({ [sort]: order });
        // }

        const products = await ProductModel.find()
            .skip(page * limit - limit)
            .limit(limit)
            .sort({ [sort]: order });
        return products.map((product) => ProductsService.getProductDto(product));
    }

    async getOne(id) {
        const product = await ProductModel.findById(id);
        return ProductsService.getProductDto(product);
    }
}
module.exports = new ProductsService();
