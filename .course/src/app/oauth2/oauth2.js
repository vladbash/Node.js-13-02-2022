const { Router } = require('express');
const passport = require('passport');

const router = new Router();

router.get('/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


router.get('/redirect/facebook', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/redirect/apple', passport.authenticate('apple', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;