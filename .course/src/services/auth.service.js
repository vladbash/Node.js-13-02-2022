const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oidc');
const config = require('config');
const { login } = require('./user.service');

const local = new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await login(username, password);
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    } catch(e) {
        cb(e);
    }
});

const google = new GoogleStrategy({
    clientID: config.get('auth.google.clientId'),
    clientSecret: config.get('auth.google.secret'),
    callbackURL: config.get('auth.google.callbackURL'),
    scope: ['profile']
}, (issuer, profile, cb) => {
    console.log(issuer, profile);
    const user = {
        _id: profile.id,
        email: `${profile.name.familyName}@google.com`
    }
    // TODO: add functionality login or signup user
    cb(null, user);
});

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user._id, email: user.email });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});

module.exports = {
    local,
    google
};