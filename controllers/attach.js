module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessories] = await Promise.all([
                req.catalog.getById(id),
                req.accessory.getAll()
            ]);

            const existingIds = car.accessories.map(a => a.id.toString());
            const availableAccessoaries = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

            console.log(car.accessories);

            res.render('attach', { title: "Attach Accessory", car, accessories: availableAccessoaries });
        } catch (err) {
            console.log(err);
            res.redirect('/404');
        }

    },
    async post(req, res) {
        const carId = req.params.id;
        const accessoryId = req.body.accessory;

        try {
            await req.catalog.attachAccessory(carId, accessoryId);

            res.redirect('/details/' + carId);
        } catch (err) {
            console.log('Error attaching accessory');
            console.log(err);

            res.redirect('/attach/' + carId);
        }
    }
};