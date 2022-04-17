const express = require('express');
const routes = require('./routes');

const APP_PORT = 3000;

const app = express();

// app.use('/my-user', (req, res) => {
//     res.send('/ was handled by use');
// });

// app.get('/', (req, res) => {
//     res.send('/ was handled');
// });

// app.lock('/', (req, res) => {
//     res.send('/ was handled by lock');
// });

app.get('/dashboard', (req, res) => {
    res.send('independent handler');
});

app.get('/messages/:user', (req, res) => {
    res.send(`messages with id ${JSON.stringify(req.params)}`);
});

app.get('/messages/:user/verbose', (req, res) => {
    res.send(`messages with id ${JSON.stringify(req.params)} verbose`);
});

app.get('/messages', (req, res) => {
    res.send(`messages`);
});

app.use('/dashboard', routes.dashboard);

app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}/ is running`);
});