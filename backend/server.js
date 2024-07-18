const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // dotenv 패키지 로드

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB URI is not defined in environment variables.');
  process.exit(1);
}

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' })); // 모든 도메인 허용

// MongoDB connection using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    // Define routes here
    const postsRouter = require('./routes/posts')(mongoose.connection);
    app.use('/posts', postsRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
