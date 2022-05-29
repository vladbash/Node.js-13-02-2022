const { Router } = require('express');
const passport = require('passport');

const loginRouter = new Router();

loginRouter.get('/', (req, res) => {
    res.render('login');
});

loginRouter.get('/federated/google', passport.authenticate('google'));

loginRouter.post('/', async (req, res, next) => {
    const { error } = req.validation || {};
    if (error) {
        res.render('login', { error });
    } else {
        const { email } = req.body;
        req.body.username = email;

        passport.authenticate('local',
            // (err, user, messages) => {
            //     if (user) {
            //         res.redirect('/');
            //     } else {
            //         res.render('login', messages);
            //     }
            // }
            {
                successReturnToOrRedirect: '/',
                failureRedirect: '/login',
                failureMessage: true
            }
        )(req, res, next);
    }
});

module.exports = loginRouter;