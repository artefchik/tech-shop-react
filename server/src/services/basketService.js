const { ObjectId } = require('mongodb');
const BasketModel = require('../models/basketModel');
const BasketProductModel = require('../models/basketProductModel');
const ProductModel = require('../models/productModel');

class BasketService {
    async createBasket(id) {
        const basket = await BasketModel.create({
            userId: new ObjectId(id),
        });
        return basket;
    }

    async addProduct(data) {
        const { basketId, productId } = data;

        const productInDb = await BasketProductModel.findOne({
            $and: [{ basketId }, { productId }],
        });

        if (productInDb) {
            productInDb.count += 1;
            return productInDb.save();
        }
        const product = await BasketProductModel.create({
            basketId,
            productId,
        });
        return product;
    }

    async deleteProduct(id) {
        const product = await BasketProductModel.findByIdAndDelete(id);
        return product;
    }

    async updateCountProduct(data) {
        const { id, count } = data;
        console.log(data);
        const updatedProduct = await BasketProductModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );
        if (count === 0) {
            const product = await BasketProductModel.findByIdAndDelete(id);
            return product;
        }
        return updatedProduct;
    }

    async getProducts(id) {
        const basketProducts = await BasketProductModel.find({ basketId: id });

        async function processProducts() {
            const products = [];

            for (const basketProduct of basketProducts) {
                try {
                    const prod = await ProductModel.findById(basketProduct.productId);

                    products.push({ prod, basketProduct });
                } catch (error) {
                    console.error(`Error processing comment: ${error.message}`);
                }
            }

            return products;
        }

        return processProducts();
    }
}

module.exports = new BasketService();
