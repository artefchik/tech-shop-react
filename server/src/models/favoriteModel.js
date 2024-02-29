const { Schema, model } = require('mongoose');

const FavoriteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Favorite', FavoriteSchema);
