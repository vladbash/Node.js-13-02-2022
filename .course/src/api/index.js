const { Router } = require('express');
const chat = require('./chat/chat');

const apiRouter = new Router();

apiRouter.use('/chats', chat);

module.exports = apiRouter;