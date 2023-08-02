const passport = require('passport');
const User = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    try{
        let user = await User.findById(jwt_payload._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
    }catch(err){
        console.log("Error in finding user for jwt ", err);
        return;
    }
        
}));