const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String },
    views: { type: Number },
    createdAt: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    types: [String],
    blocks: [
        {
            type: { type: String, required: true },
            title: String,
            paragraph: { type: String },
            src: { type: String },
        },
    ],
});

module.exports = model('Article', ArticleSchema);
