const User = require('../models/user');
const { JWT_Secret } = require('../config');
const { signInToken } = require('../helpers/createToken');

module.exports = {
	// User SignUp
	signUp: async (req, res, next) => {
		const { email, password } = req.value.body;
		const newUser = new User({ email, password });

		// Check if the user already exist
		const findUser = await User.findOne({ email });
		if (findUser) {
			return res.json({ message: 'User already exist' });
		}

		// Create new user
		await newUser.save();

		// Respond with token
		const token = signInToken(newUser);
		return res.status(200).json({ token });
	},

	signIn: async (req, res, next) => {
		console.log('signin');
	},

	secret: async (req, res, next) => {
		
		res.status(201).json({secret: "data"})
	},
};
