// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts'); // 라우트 파일 가져오기
require('dotenv').config(); // .env 파일을 사용하기 위해 dotenv 로드

const app = express(); // Express 애플리케이션 생성
app.use(cors()); // CORS 미들웨어 등록
app.use(express.json()); // JSON 형식의 요청 본문을 파싱하기 위한 미들웨어

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// 라우트 등록
app.use('/api/posts', postRoutes);

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));