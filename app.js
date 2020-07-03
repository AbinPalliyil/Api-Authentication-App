const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()



const userRoutes = require('./routes/users');


// Mongo Db Connection
mongoose.connect('mongodb://localhost/ApiAuthentication', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.port || 5000;
app.listen(port, () => {
	console.log(`App is running on ${port}`);
});
