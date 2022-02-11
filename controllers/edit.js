module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.catalog.getById(id);

        if (car.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login');
        }

        if (car) {
            res.render('edit', { title: 'Edit', car })
        } else {
            res.redirect('/404')
        }
    },
    async post(req, res) {
        const id = req.params.id;

        let img;

        try {
            if (req.files) {
                img = req.files.imageUrl;
                await img.mv('./static/assets/cars/' + img.name)
            }
        } catch (err) {
            console.log(err);
            console.log('Edit error');
            process.exit(1);
        }

        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: img ? img.name : 'no-image.jpg',
            price: Number(req.body.price),
            owner: req.session.user.id
        }

        try {
            await req.catalog.updateById(id, car, req.session.user.id);
            res.redirect(`/details/${id}`);
        } catch (err) {
            console.log(err);
            res.redirect('/edit');
        }
    }
};