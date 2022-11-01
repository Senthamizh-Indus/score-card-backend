const Joi = require('joi');

const addStudentSchema = Joi.object().keys({
    student_name: Joi.string().required(),
    standard: Joi.number().required(),
    section: Joi.string().required(),
    rollno: Joi.number().required(),
});

module.exports = addStudentSchema