require('dotenv').config();
require('./utils/database');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// ROUTES
const userRoutes = require('./routes/users');
const favoriteRoutes = require('./routes/favorites');

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

app.listen(PORT, () => console.log(`Service is running on ${PORT}`));
