const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler'); // 에러 핸들러 임포트
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api/posts', postRoutes);

// 에러 핸들러 미들웨어 등록 (라우트 설정 이후에 위치해야 함)
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));