// [x] initialize and configure Express app
// [x] initialize tempating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] edit
// - [x] delete
// - [x] search
// - [x] acssesory create
// - [x] acssesory read
// - [x] attach acssesory
// [ ] implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improved home (search)
// - [ ] edit
// - [ ] delete
// - [x] create acssesory
// - [x] attach acssesory to car
// - [x] update details to include acssesory
// [x] add front end code
// [x] add database conection
// [x] create car model
// [x] upgrade car service to use car model
// [x] add validation rules to car model
// [x] create acssesory model

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const initDb = require('./models');

const carService = require('./services/cars');
const accessoryService = require('./services/accessory');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details} = require('./controllers/details');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

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
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    //TODO: edit

    //TODO: delete

    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post);

    app.all('*', notFound);

    app.listen(config.port, () => console.log(`Server is started on port ${config.port}`));
}