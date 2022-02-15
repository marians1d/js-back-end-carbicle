const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { mapError } = require('../services/util');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username must be only numbers and letters'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password must be only numbers and letters'),
    body('repeatPassword').custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),

    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('register', { title: 'Register', data: {username: req.body.username} });
        }
    });

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await req.auth.login(username, password);

        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        
        res.render('login', { title: 'Login' });
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;