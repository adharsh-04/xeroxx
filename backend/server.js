const express = require('express');
const userApp = require('../backend/APIs/userApi.js');
const adminApp = require('../backend/APIs/adminApi.js');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

app.use(express.json());

// if path starts with user-api
app.use('/userapi', userApp);
app.use('/adminapi', adminApp);

// connecting to mongodb
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
