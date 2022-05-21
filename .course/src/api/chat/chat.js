const { Router } = require('express');

const chatRouter = new Router();

chatRouter.get('/', (req, res) => {
    const rooms = [
        {
            id: 'li3j32u3298328jj923',
            name: 'Jupiter Team',
            participants: [
                {}
            ]
        },
        {
            id: 'l1i3j32u3298328jj923',
            name: 'Jupiter Team',
            participants: [
                {}
            ]
        },
        {
            id: 'li3j3233u3298328jj923',
            name: 'Jupiter Team',
            participants: [
                {}
            ]
        },
        {
            id: 'li3j32u32323298328jj923',
            name: 'Jupiter Team',
            participants: [
                {}
            ]
        },
    ];

    res.json(rooms);
});

module.exports = chatRouter;