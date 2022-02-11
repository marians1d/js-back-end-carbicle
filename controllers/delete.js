module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.catalog.getById(id);

        if (car.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login');
        }

        if (car) {
            res.render('delete', { title: 'Delete listing', car });
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            const isOwner = await req.catalog.deleteCar(id, req.session.user.id);

            if (isOwner) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log('Attempted to delete non-existent Id', id);
            res.redirect('/404')
        }
    }
};