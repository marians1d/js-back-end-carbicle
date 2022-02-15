const { Schema, model } = require('mongoose');
const { comparePasswords, hashPassword } = require('../services/util');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    hashedPassword: { type: String, required: true }
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.methods.comparePasswords = async function (password) {
    return await comparePasswords(password, this.hashedPassword);
}

userSchema.pre('save', async function (next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;