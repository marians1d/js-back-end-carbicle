module.exports = {
    async home(req, res) {
        const cars = await req.catalog.getAll(req.query);
        
        res.render('index', { title: 'Welcome to Carbicle', cars, query: req.query});
    }
}