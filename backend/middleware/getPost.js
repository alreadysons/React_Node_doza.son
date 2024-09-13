const Post = require('../models/Post');
const mongoose = require('mongoose');

async function getPost(req, res, next) {
  const id = req.params.id;

  // ID 유효성 검사
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: '유효하지 않은 게시글 ID입니다.' });
  }

  let post;
  try {
    post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = getPost;