const http = require('http');
const controller = require('./controller');
const logger = require('./logger');

const APP_PORT = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    logger.logRequest(req);
    const { pathname } = new URL(req.url, 'http://localhost');
    if (req.method === 'GET') {
        if (['/', '/index.html'].includes(pathname)) {
            controller.index(req, res);
        } else if (new RegExp(/assets/).test(pathname)) {
            // res.setHeader('Content-Type', 'image/x-icon');
            controller.assets(req, res);
        } else {
            res.statusCode = 404;
            res.end('unhandled route');
        }
    } else if (req.method === 'POST') {
        // res.end('POST Handled');
        if (['/', '/index.html'].includes(pathname)) {
            let body = '';

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', () => {
                console.log('req end');
                controller.index(req, res, JSON.parse(body));
            });
            
            req.on('error', () => {
                console.log('req error');
                res.statusCode = 400;
                res.end('unhandled error');
            });
        }
    } else {
        res.statusCode = 404;
        res.end('unhandled method');
    }
});

server.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}/ is running`);
});