const { celebrate, Joi, Segments } = require('celebrate');

const createItemValidation = celebrate({
    [Segments.BODY]: Joi.object({
        value: Joi.string().required(),
        date: Joi.date().iso().not().required(),
    })
});

const updateItemValidation = celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.number().required(),
        value: Joi.string().required(),
        date: Joi.date().iso().not().required(),
    })
});

const itemParamValidation = celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required(),
    }
});

module.exports = {
    createItemValidation,
    updateItemValidation,
    itemParamValidation
};