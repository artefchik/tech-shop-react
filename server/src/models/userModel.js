const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivatedEmail: { type: Boolean, default: false },
    activatedLinkEmail: { type: String },
    roles: {
        type: [String],
        default: 'user',
    },
});

module.exports = model('User', UserSchema);
