// [x] initialize and configure Express app
// [x] initialize tempating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [ ] edit
// - [ ] delete
// - [ ] search
// - [ ] acssesory create
// - [ ] acssesory read
// - [ ] attach acssesory
// [ ] implement controllers
// - [ ] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [ ] improved home (search)
// - [ ] edit
// - [ ] delete
// - [ ] create acssesory
// - [ ] attach acssesory to car
// - [ ] update details to include acssesory
// [ ] add front end code
// [ ] add database conection
// [ ] create car model
// [ ] upgrade car service to use car model
// [ ] add validation rules to car model
// [ ] create acssesory model

const port = 3000;

const express = require('express');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const initDb = require('./models');

const carService = require('./services/cars')

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details} = require('./controllers/details');
const create = require('./controllers/create'); 

const { notFound } = require('./controllers/notFound');


start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(fileUpload({
        createParentPath: true
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use('/public', express.static('static'));
    app.use(carService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.all('*', notFound);

    app.listen(port, () => console.log(`Server is started on port ${port}`));
}