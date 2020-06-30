const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_Secret } = require('./config');
const User = require('./models/user');

// Authentication using JWT
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_Secret,
		},
		async (payload, done) => {
			try {
				// Checking user
				const user = await User.findById(payload.sub);

				// If user not found
				if (!user) {
					return done(null, false);
				}
				// Otherwise user found
				done(null, user);
			} catch (error) {
				console.log(error);
				done(error, false);
			}
		},
	),
);

// Authentication using Local
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				// Find the user by email
				const user = await User.findOne({email});
				// If user not found
				if (!user) {
					return done(null, false);
				}

				// Checking password match
                const isMatch = await user.isValidPassword(password);
				if (!isMatch) {
					return done(null, false);
				}

				// Otherwise return the user
				done(null, user);
			} catch (error) {}
		},
	),
);
