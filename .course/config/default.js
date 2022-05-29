module.exports = {
    ...require('./production'),
    db: {
        connectionString: 'mongodb://db:27017/teamDocs'
    },
    auth: {
        google: {
            secret: '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',
            clientId: '821376278111-2lrh1fgnsavep7n2gepvdgav1ti8skas.apps.googleusercontent.com',
            callbackURL: '/oauth2/redirect/google'
        }
    }
};