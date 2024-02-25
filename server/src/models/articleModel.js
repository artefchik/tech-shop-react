const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String },
    views: { type: Number },
    createdAt: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: [String],
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
