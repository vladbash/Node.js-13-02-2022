const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');

const scheme = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(24).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
    confirmPassword: Joi.ref('password')
});

const apiValidator = celebrate({
    [Segments.BODY]: scheme
});

const appValidator = (req, res, next) => {
    const { body } = req;
    req.validation = scheme.validate(body);
    next();
};

module.exports = {
    scheme,
    apiValidator,
    appValidator
};
