module.exports = {
    get(req, res) {
        res.render('create', { title: 'Create listing' });
    },
    async post(req, res) {
        let img;

        try {
            if (req.files) {
                img = req.files.imageUrl;
                await img.mv('./static/assets/cars/' + img.name);
            }
        } catch (err) {
            console.log(err);
            console.log('create error');
            process.exit(1);
        }
        
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: img ? img.name : 'no-image.jpg',
            price: Number(req.body.price),
            owner: req.session.user.id
        };

        try {
            await req.catalog.createCar(car);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.redirect('/create');
        }


    }
};