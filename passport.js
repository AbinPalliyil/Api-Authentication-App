const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_Secret } = require('./config');
const User = require('./models/user');

// Extracting user from JWT
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_Secret
		},async (payload, done) => {
			try {
                console.log({payload})
				// Checking user
                const user = await User.findById(payload.sub);
                console.log({user})
                
				// If user not found
				if (!user) {
					return done(null, false);
				}
				// Otherwise user found
				 done(null, user);
			} catch (error) {
                console.log(error)
				done(error, false);
			}
		},
	),
);
