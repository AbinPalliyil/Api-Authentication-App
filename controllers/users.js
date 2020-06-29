const User = require('../models/user');

module.exports = {
	signUp: async (req, res, next) => {
		const { email, password } = req.value.body;
		const newUser = new User({
			email,
			password,
		});

		// Check if the user already exist
		const findUser = await User.findOne({email});
		if(findUser){
			return res.json({message: "User already exist"});
		}
		
		// Create new user
		await newUser.save();

		// Respond with token
		res.json({user: newUser})

	},

	signIn: async (req, res, next) => {
		console.log('signin');
	},

	secret: async (req, res, next) => {
		console.log('secret');
	},
};
