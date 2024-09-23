const express = require('express');
const router = express.Router();
const postsController = require('../contollers/postsController');
const getPost = require('../middleware/getPost');


// 모든 게시글 가져오기
router.get('/', postsController.getAllPosts);

// 개별 게시글 가져오기
router.get('/:id', getPost, postsController.getPostById);

// 새 게시글 작성
router.post('/', postsController.createPost);

// 게시글 전체 업데이트 (PUT)
router.put('/:id', postsController.updatePost);

// 게시글 부분 업데이트 (PATCH)
router.patch('/:id', getPost, postsController.partialUpdatePost);

// 게시글 삭제
router.delete('/:id', postsController.deletePost);

module.exports = router;