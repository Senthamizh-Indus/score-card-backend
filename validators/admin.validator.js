const Joi = require('joi');

const addAdminSchema = Joi.object().keys({
    username: Joi.string().required().email().max(80),
    password: Joi.string().required().min(8).max(12),
});

module.exports = addAdminSchema