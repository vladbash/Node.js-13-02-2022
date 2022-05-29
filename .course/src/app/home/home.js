const { Router } = require('express');

const homeRouter = new Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
    res.render('index');
});

homeRouter.post('/', (req, res) => {
    res.render('index');
});

module.exports = homeRouter;