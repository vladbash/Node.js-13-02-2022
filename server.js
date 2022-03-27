const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(`[Request] url: `, req.url);
    if (req.url == '/') {
        res.end('Hello from end! From separated listener');
    } else if (req.url == '/favicon.ico') {
        // res.end();
        fs.createReadStream('./favicon.ico').pipe(res);
    } else {
        res.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`Server is serving on http://localhost:${PORT}`);
});