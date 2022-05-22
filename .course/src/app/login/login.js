const { Router } = require('express');
const { signupValidation } = require('../../validations');
const { userService } = require('../../services');

const loginRouter = new Router();

loginRouter.get('/', (req, res) => {
    res.render('login', { error: '' });
});

loginRouter.post('/', async (req, res) => {
    // const { error } = req.validation;
    // if (error) {
    //     res.render('login', { error });
    // } else {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);

            req.session.user = user;
            res.locals.auth = true;
            res.redirect('/');
        } catch (e) {
            console.error(e);
            res.render('login', { error: 'Invalid credentials' });
        }
   // }
});

module.exports = loginRouter;