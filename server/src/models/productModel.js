const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    imageSrc: { type: String, required: true },
    memory: [{ memoryVariant: String, isInStock: Boolean }],
    price: {
        current: [String],
        previous: [String],
    },
});

module.exports = model('Product', ProductSchema);
