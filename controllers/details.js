module.exports = {
    async details (req, res) {
        const id = req.params.id;
        const car = await req.catalog.getById(id);

        if (car) {
            res.render('details', { title: `${car.name} details`, car})
        } else {
            res.redirect('404');
        }
    }
}