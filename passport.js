const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusStrategy = require('passport-google-plus-token');
const FacebookStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');

const {
	JWT_SECRET,
	GOOGLE_OAUTH_CLIENTID,
	GOOGLE_OAUTH_CLIENTSECRET,
	FB_OAUTH_CLIENTID,
	FB_OAUTH_CLIENTSECRET,
} = require('./config');
const User = require('./models/user');

// Authentication using JWT
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET,
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
				const user = await User.findOne({ 'local.email': email });
				// If user not found
				if (!user) {
					return done(null, false);
				}

				// Checking password match
				const isMatch = await user.isValidPassword(password);
				console.log(isMatch);
				if (!isMatch) {
					return done(null, false);
				}

				// Otherwise return the user
				done(null, user);
			} catch (error) {
				console.log(error);
			}
		},
	),
);

// Passport Google plus Authentication
passport.use(
	'googleToken',
	new GooglePlusStrategy(
		{
			clientID: GOOGLE_OAUTH_CLIENTID,
			clientSecret: GOOGLE_OAUTH_CLIENTSECRET,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Checking is the user already exist
				const existingUser = await User.findOne({
					'google.id': profile.id,
				});
				if (existingUser) {
					return done(null, existingUser);
				}
				// Create new user
				const newUser = new User({
					method: 'google',
					google: {
						id: profile.id,
						email: profile.emails[0].value,
					},
				});

				await newUser.save();
				done(null, newUser);
			} catch (error) {
				console.log({ error });
			}
		},
	),
);

// Facebook Authentication
passport.use(
	'facebookToken',
	new FacebookStrategy(
		{
			clientID: FB_OAUTH_CLIENTID,
			clientSecret: FB_OAUTH_CLIENTSECRET,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {

				// Checking existing user
				const existingUser = await User.findOne({'facebook.id' : profile.id});
				if(existingUser){
					done(null, existingUser);
				}
				
				// Creating new user
				const newUser = new User ({
					method: "facebook",
					facebook: {
						id: profile.id,
						email: profile.emails[0].value,
					}
				});
				await newUser.save();
				done(null, newUser);


				
			} catch (error) {
				done(error, false, error.message)
			}
		},
	),
);
