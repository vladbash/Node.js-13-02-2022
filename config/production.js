module.exports = {
    ...require('./default'),
    server: {
        port: process.env.PORT || 80
    }
};