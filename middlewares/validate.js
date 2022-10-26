const Validators = require('../validators')

const ReqBodyValidator = function(validator) {
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) 
                return next(res.status(422).json({message: "Unprocessable entity"}))
            next(res.status(500).json({message: "Internal server error"}))
        }
    }
}

module.exports = { ReqBodyValidator }
