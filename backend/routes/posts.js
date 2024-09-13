// routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// ID로 게시글 찾기 미들웨어
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

// 모든 게시글 가져오기
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 개별 게시글 가져오기
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
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

// 게시글 전체 업데이트 (PUT)
router.put('/:id', getPost, async (req, res) => {
  res.post.title = req.body.title;
  res.post.content = req.body.content;
  res.post.author = req.body.author;

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 게시글 부분 업데이트 (PATCH)
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.title != null) res.post.title = req.body.title;
  if (req.body.content != null) res.post.content = req.body.content;
  if (req.body.author != null) res.post.author = req.body.author;

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 게시글 삭제
router.delete('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;