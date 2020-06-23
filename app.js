const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares

// Routes

// Start the server
const port = process.env.port || 5000;
app.listen(port, () => {
	console.log(`App is running on ${port}`);
});
