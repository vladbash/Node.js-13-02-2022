const bcrypt = require('bcryptjs');
const { User } = require('../models');

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
    }
};

// TODO: add error handling (HW)
const signup = async (name, email, password) => {
    try {
        const user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        user.save();

        // send email for verification

        return user;
    } catch (e) {
        console.error('[user.service][sign up]: ', e);
        if (e.code === 11000) {
            throw new Error(`${email} is already exist in system`);
        }
    }
};

const verify = async verifyingKey => {
    const user = await User.findOne({ verifyingKey });
    if (user) {
        user.verified = true;
        await user.save();
        return user;
    } else {
        throw new Error('Invalid verifying key');
    }
};

module.exports = {
    login,
    signup,
    verify
};