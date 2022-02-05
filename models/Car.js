const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    description: { type: String , default: ''},
    imageUrl: { type: String },
    price: { type: Number },
    isDeleted: { type: Boolean, default: false }
});

const Car = model('Car', carSchema);

module.exports = Car;