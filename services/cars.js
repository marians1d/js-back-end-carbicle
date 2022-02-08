const Car = require('../models/Car');
const fs = require('fs/promises');
const { carViewModel } = require('./util');

async function getAll(query) {
    const options = {
        isDeleted: false
    }

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        options.price = { $gte: Number(query.from) }
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
    const car = await Car.findById(id).populate('accessories');
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

async function updateById(id, car) {
    const existing = await Car.findById(id);

    if (existing.imageUrl !== car.imageUrl && existing.imageUrl !== 'no-image.jpg') {
        await fs.unlink('./static/assets/cars/' + existing.imageUrl);
    }

    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl;
    existing.price = car.price;
    existing.accessories = car.accessories;

    await existing.save();
}

async function deleteCar(id, ownerId) {
    const existing = await Car.findById(id).where({ isDeleted: false });

    if (existing.imageUrl !== 'no-image.jpg') {
        await fs.unlink('./static/assets/cars/' + existing.imageUrl);
    }

    if (existing.owner != ownerId) return false;

    existing.isDeleted = true;

    await Car.findByIdAndUpdate(id, { isDeleted: true });

    return true;

}

async function attachAccessory(carId, accessoryId) {
    const existing = await Car.findById(carId);

    existing.accessories.push(accessoryId);

    await existing.save();
}

module.exports = () => (req, res, next) => {
    req.catalog = {
        getAll,
        getById,
        createCar,
        updateById,
        deleteCar,
        attachAccessory
    }

    next();
} 