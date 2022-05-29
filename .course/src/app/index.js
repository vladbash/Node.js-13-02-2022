const { Router } = require('express');

const appRouter = new Router();

appRouter.use('/', require('./home/home'));
appRouter.use('/signup', require('./signup/signup'));
appRouter.use('/login', require('./login/login'));
appRouter.use('/verify', require('./verify/verify'));
appRouter.use('/oauth2', require('./oauth2/oauth2'));

appRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = appRouter;