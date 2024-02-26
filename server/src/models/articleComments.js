const { Schema, model } = require('mongoose');

const ArticleCommentsSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
});

module.exports = model('ArticleComment', ArticleCommentsSchema);
