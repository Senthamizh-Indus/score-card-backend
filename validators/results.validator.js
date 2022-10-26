const Joi = require('joi');

const subjectArray = Joi.object().keys({
    subject: Joi.string(),
    marks: Joi.object().keys({
        faMark: Joi.string(),
        faOralMark: Joi.string(),
        saMark: Joi.string(),
        saOral: Joi.string(),
        overallMark: Joi.string()
    })
});

const addResultSchema = Joi.object().keys({
    part1: Joi.object().keys({
        subjects: Joi.array().items(subjectArray),
        grandTotal: Joi.string(),
        percentage: Joi.string(),
        rank: Joi.number()
    }),
    part2: Joi.object().keys({
        developmentAndMaturity: Joi.string(),
        responsiblity: Joi.string(),
        selfConfidence: Joi.string(),
        participationInGroupWork: Joi.string(),
        neatness: Joi.string(),
        music: Joi.string(),
        discipline: Joi.string(),
        handWork: Joi.string(),
        attitudeTowardsHomeWork: Joi.string(),
        craft: Joi.string(),
        regularityAndPunctuality: Joi.string(),
    }),
    part3: Joi.object().keys({
        workingDays: Joi.number(),
        daysPresent: Joi.number(),
        perentage: Joi.number()
    }),
    cgp: Joi.string(),
    grade: Joi.string()
});

module.exports = addResultSchema