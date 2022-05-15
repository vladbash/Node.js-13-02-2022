module.exports = {
    ...require('./production'),
    db: {
        connectionString: 'mongodb://localhost:27017/test'
    }
};