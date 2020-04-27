require('dotenv').config();
require('./utils/database');

const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./utils/cors');
const app = express();
const PORT = process.env.PORT || 1337;

// ROUTES
const userRoutes = require('./routes/users');
const favoriteRoutes = require('./routes/favorites');

app.use(cors(process.env.ENVIRONMENT === 'DEVELOPMENT' ? null : corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Elder Scrolls Legends Service');
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

app.listen(PORT, () => console.log(`Service is running on port: ${PORT}`));
