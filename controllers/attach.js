module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessories] = await Promise.all([
                req.catalog.getById(id),
                req.accessory.getAll()
            ]);

            if (car.owner != req.session.user.id) {
                console.log('User is not owner!');
                return res.redirect('/login');
            }

            const existingIds = car.accessories.map(a => a.id.toString());
            const availableAccessoaries = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

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
            const isOwner = await req.catalog.attachAccessory(carId, accessoryId, req.session.user.id);

            if (isOwner) {
                res.redirect('/details/' + carId);
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log('Error attaching accessory');
            console.log(err);
            res.redirect('/attach/' + carId);
        }
    }
};