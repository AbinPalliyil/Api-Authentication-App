const JWT = require('jsonwebtoken');

const { JWT_Secret } = require('../config');

module.exports = {
	signInToken: (userId) => {
		return JWT.sign(
			{
				iss: 'Abin',
				sub: userId,
				iat: new Date().getTime(),
				exp: new Date().setDate(new Date().getDate() + 1),
			},
			JWT_Secret,
		);
	},
};
