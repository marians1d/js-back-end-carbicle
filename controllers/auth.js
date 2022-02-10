module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },
    async registerPost(req, res) {
        const { username, password, repeatPassword} = req.body;
 
        if (username == '' || password == '') {
            return res.redirect('/register');
        }
        
        if (password != repeatPassword) {
            return res.redirect('/register');
        }

        try {
            await req.auth.register(username, password);
            res.redirect('/');
        } catch (err) {
            console.error(err.message);
            res.redirect('/register');
        }
    },
    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },
    async loginPost(req, res) {
        const { username, password } = req.body;
        
        try {
            await req.auth.login(username, password);

            res.redirect('/');
        } catch (err) {
            console.error(err.message);
            res.redirect('/login');
        }
    },
    logoutGet(req, res) {
        req.auth.logout();
        res.redirect('/');
    }
}