const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    description: { type: String, default: '' },
    imageUrl: { type: String },
    price: { type: Number, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    isDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;