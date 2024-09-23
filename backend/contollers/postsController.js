const Post = require('../models/Post');

// 모든 게시글 가져오기
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    next(err)
  }
};

// 개별 게시글 가져오기
exports.getPostById = (req, res) => {
  res.json(res.post);
};

// 새 게시글 작성
exports.createPost = async (req, res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    next(err)
  }
};

// 게시글 전체 업데이트 (PUT)
exports.updatePost = async (req, res,next) => {
  const id = req.params.id;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    res.json(updatedPost);
  } catch (err) {
    next(err)
  }
};

// 게시글 부분 업데이트 (PATCH)
exports.partialUpdatePost = async (req, res,next) => {
  if (req.body.title != null) res.post.title = req.body.title;
  if (req.body.content != null) res.post.content = req.body.content;
  if (req.body.author != null) res.post.author = req.body.author;

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    next(err)
  }
};

// 게시글 삭제
exports.deletePost = async (req, res,next) => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    next(err)
  }
};