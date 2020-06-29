const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/users');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.port || 5000;
app.listen(port, () => {
	console.log(`App is running on ${port}`);
});
