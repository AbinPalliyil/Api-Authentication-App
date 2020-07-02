const mongoose = require('mongoose');
const { string } = require('joi');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
	method: {
		type: String,
		enum: ['local', 'google', 'facebook'],
		required: true,
	},
	local: {
		email: {
			type: String,
			lowercase: true,
		},
		password: {
			type: String,
		},
	},
	google: {
		id: {
			type: String,
		},
		email: {
			type: String,
			lowercase: true,
		},
	},
	facebook: {
		id: {
			type: String,
		},
		email: {
			type: String,
			lowercase: true,
		},
	},
});

// Encrpt password
userSchema.pre('save', async function (next) {
	if (this.method === 'local') {
		try {
			const salt = await bcrypt.genSalt(10);
			const passwordHash = await bcrypt.hash(this.local.password, salt);
			this.local.password = passwordHash;
			next();
		} catch (error) {
			next(error);
		}
	}
});

// validate passowrd
userSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.local.password);
	} catch (error) {
		throw new Error(error);
	}
};

// Create Model

module.exports = mongoose.model('user', userSchema);
