const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'no-image.jpg' },
    price: { type: Number, min: 0 },
    owner: { type: ObjectId, ref: 'User' }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;