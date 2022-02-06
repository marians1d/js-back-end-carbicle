module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Add Accessory'});
    },
    async post(req, res) {
        let img;

        if (req.files) {
            img = req.files.imageUrl;
            await img.mv('./static/assets/accessories/' + img.name)
        }

        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: img ? img.name : 'no-image.jpg',
            price: Number(req.body.price),
        };

        try {
            await req.accessory.createAccessory(accessory);

            res.redirect('/');           
        } catch (err) {
            console.log('Error creating accessory');
            console.log(err);
            res.redirect('/accessory');
        }


    }
}