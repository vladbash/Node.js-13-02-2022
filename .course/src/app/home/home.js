const { Router } = require('express');

const homeRouter = new Router();

homeRouter.get('/', (req, res) => {
    const { auth } = req.session;
    res.render('index', { auth });
});

homeRouter.post('/', (req, res) => {
    
    res.render('index', {});
});

module.exports = homeRouter;