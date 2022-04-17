const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const { itemsProvider } = require('../../services');

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    let template = '';
    const index$ = fs.createReadStream(path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'views',
        'index.html'
    ), { encoding: 'utf8' });

    // DOESN'T WORK
    // const index$ = fs.createReadStream(path.join(
    //     __dirname,
    //     '..\\..\\..\\public\\views\\index.html'
    // ), { encoding: 'utf8' });

    index$.on('data', data => {
        template += data;
    });

    index$.on('end', async () => {
        const items = await itemsProvider.getItems();
        const list = items.map(e => `<li>[${e.date}] ${e.value}</li>`).join('\n');
        template = template.replace('{%list%}', list);
        res.send(template);
    });

    index$.on('error', () => {
        res.status(500).send('Unexpected error');
    });
});

homeRouter.get('/index.html', (req, res) => {
    res.redirect('/');
});

homeRouter.post('/', async (req, res) => {
    // let body = '';

    // req.on('data', data => {
    //     body += data;
    // });

    // req.on('end', async () => {
    //     // console.log(req.body); // ?? - new topic
    //     const item = body.replace('itemValue=', '');
    //     await itemsProvider.setItem({
    //         value: item,
    //         date: new Date().toISOString()
    //     });
    //     res.redirect('/');
    // });
    await itemsProvider.setItem({
        value: req.body.itemValue,
        date: new Date().toISOString()
    });
    res.redirect('/');
});

module.exports = homeRouter;