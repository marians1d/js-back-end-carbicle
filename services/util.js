function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories,
        isDeleted: car.isDeleted
    };

    if (model.accessories.lenght > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }

    return model;
}

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        peripherals: accessory.peripherals
    };
}

module.exports = {
    carViewModel,
    accessoryViewModel
}