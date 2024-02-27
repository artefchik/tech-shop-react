const { Schema, model } = require('mongoose');

const BasketProductSchema = new Schema({
    basketId: { type: Schema.Types.ObjectId, ref: 'Basket' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: { type: Number, default: 1 },
});

module.exports = model('BasketProduct', BasketProductSchema);
