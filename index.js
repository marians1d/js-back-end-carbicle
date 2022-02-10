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
// - [x] register user
// - [x] login user
// - [x] logout user
// - [ ] add authorization checks to data modification
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
// - [x] auth controler with login, register, logout actions
// - [x] protect routes
// [x] add front end code
// [x] add database conection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
// [x] create Acssesory model
// [x] add session middleware and auth libraries
// [x] create User model
// [ ] add owner property to Car, Accessory models

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const initDb = require('./models');

const carService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

const { registerGet, registerPost, loginGet, loginPost, logoutGet } = require('./controllers/auth');

const { notFound } = require('./controllers/notFound');
const { isLogedIn } = require('./services/util');


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

    app.use(session({
        secret: 'fear is the mind killer',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use('/public', express.static('static'));
    app.use(carService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(isLogedIn(), create.get)
        .post(isLogedIn(), create.post);

    //TODO: edit

    //TODO: delete

    app.route('/accessory')
        .get(isLogedIn(), accessory.get)
        .post(isLogedIn(), accessory.post);

    app.route('/attach/:id')
        .get(isLogedIn(), attach.get)
        .post(isLogedIn(), attach.post);

    app.route('/register')
        .get(registerGet)
        .post(registerPost);

    app.route('/login')
        .get(loginGet)
        .post(loginPost);

    app.get('/logout', logoutGet);

    app.all('*', notFound);

    app.listen(config.port, () => console.log(`Server is started on port ${config.port}`));
}