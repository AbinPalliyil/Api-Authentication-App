module.exports = {
	signUp: async (req, res, next) => {
		console.log("sign up");
		console.log("body", req.value.body);
	},

	signIn: async (req, res, next) => {
		console.log("signin");
	},

	secret: async (req, res, next) => {
		console.log("secret");
	},
};
