const { Router } = require('express');
const { User } = require('../../models');

const homeRouter = new Router();

homeRouter.get('/', async (req, res) => {
    const user = await User.findOne();
    console.log(user.get('age'));
    const { auth } = req.session;
    res.render('chat-room', { auth });
});

homeRouter.post('/', (req, res) => {
    
    res.render('index', {});
});

module.exports = homeRouter;