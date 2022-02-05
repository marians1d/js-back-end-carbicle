const Car = require('../models/Car');
const { carViewModel } = require('./util');

async function getAll(query) {
    const options = {
        isDeleted: false
    }

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from)}
    }

    if (query.to) {
        if (!options.price) {
            options.price = {};
        }

        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options)
    return cars.map(carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id);
    if (car) {
        return carViewModel(car);
    } else {
        return undefined;
    }
}

async function createCar(car) {
    const carResult = new Car(car);
    await carResult.save();
}

module.exports = () => (req, res, next) => {
    req.catalog = {
        getAll,
        getById,
        createCar,
    }

    next();
} 