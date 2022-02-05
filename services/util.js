function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        isDeleted: car.isDeleted
    }
}

module.exports = {
    carViewModel,
}