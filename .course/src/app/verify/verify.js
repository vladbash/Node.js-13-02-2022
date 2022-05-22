const { Router } = require('express');
const { userService } = require('../../services');

const verifyRouter = new Router();

verifyRouter.get('/:verifyingKey', async (req, res) => {
    try {
        const { verifyingKey } = req.params;
        const user = await userService.verify(verifyingKey);

        console.log(user);

        res.send('Verified');
    } catch (e) {
        res.send(e.toString());
    }
});

module.exports = verifyRouter;