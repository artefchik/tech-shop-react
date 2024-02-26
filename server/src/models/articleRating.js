const { Schema, model } = require('mongoose');

const ArticleRatingSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    feedback: { type: String },
    rate: { type: Number },
});

module.exports = model('ArticleRating', ArticleRatingSchema);
