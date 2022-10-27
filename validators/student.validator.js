const Joi = require('joi');

const addStudentSchema = Joi.object().keys({
    studnet_name: Joi.string().required(),
    standard: Joi.string().required(),
    section: Joi.string().required()
});

module.exports = addStudentSchema