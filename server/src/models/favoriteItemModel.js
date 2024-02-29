const { Schema, model } = require('mongoose');

const FavoriteItemSchema = new Schema({
    favoriteId: { type: Schema.Types.ObjectId, ref: 'Favorite' },
    item: { type: Schema.Types.ObjectId },
    type: { type: String },
});

module.exports = model('FavoriteItem', FavoriteItemSchema);
