const { Router } = require('express');

const appRouter = new Router();

appRouter.use('/', require('./home/home'));
appRouter.use('/signup', require('./signup/signup'));
appRouter.use('/login', require('./login/login'));
appRouter.use('/verify', require('./verify/verify'));

module.exports = appRouter;