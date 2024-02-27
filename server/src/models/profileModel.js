const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    age: { type: Number, default: 0 },
});

module.exports = model('Profile', ProfileSchema);
