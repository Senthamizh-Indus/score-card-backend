const Joi = require('joi');

const addStudentSchema = Joi.object().keys({
    student_name: Joi.string().required(),
    standard: Joi.string().required(),
    section: Joi.string().required(),
    rollno: Joi.string().required(),
});

module.exports = addStudentSchema