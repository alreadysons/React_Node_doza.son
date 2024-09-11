// routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// 모든 게시글 가져오기
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 새 게시글 작성
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 게시글 수정
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;