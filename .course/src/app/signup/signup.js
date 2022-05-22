const { Router } = require('express');
const { userService } = require('../../services');
const { signupValidation } = require('../../validations');

const signupRouter = new Router();

signupRouter.get('/', (req, res) => {
    res.render('signup', { error: '' });
});

signupRouter.post('/', signupValidation.appValidator, async (req, res) => {
    const { error } = req.validation;
    if (error) {
        res.render('signup', { error: JSON.stringify(error.details) });
    } else {
        const {
            name,
            email,
            password
        } = req.body;

        try {
            const user = await userService.signup(name, email, password);
            res.render('signup', { hideForm: true, message: `Success sign up! Check ${user.email} inbox!`, error: '' });
        } catch (e) {
            res.render('signup', { error: e.toString() });
        }
    }
});

module.exports = signupRouter;