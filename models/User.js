const mongoose = require('mongoose');
const { string } = require('joi');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema ({
    email: String,
    password: String,
})

// Create Model
const User = mongoose.model('user', userSchema);

module.exports = User; 