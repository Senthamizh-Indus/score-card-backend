const passport = require('passport');
const passportJWT = require('passport-jwt');
const Config = require('../configuration/config');
const { getAdmin } = require('../models/admin.model');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = Config.jwt.secret;

// lets create our strategy for web token
module.exports = passport => {
    passport.use(
        new JwtStrategy(jwtOptions, function(jwt_payload, next) {
            console.log('payload received', jwt_payload);
            let user = getAdmin({ id: jwt_payload.id });

            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        })
    );
}
