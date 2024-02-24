const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String },
    views: { type: Number },
    createdAt: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Article', ArticleSchema);
