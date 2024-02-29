const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    imageSrc: { type: String, required: true },
    memory: { type: String },
    price: {
        current: { type: Number },
        previous: { type: Number },
    },
});

module.exports = model('Product', ProductSchema);
