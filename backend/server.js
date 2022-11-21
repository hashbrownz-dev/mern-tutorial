require('dotenv').config();
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

// MOUNT MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// MOUNT ROUTES

app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});