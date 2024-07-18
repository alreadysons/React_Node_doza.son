const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = function(connection) {
  const router = express.Router();
  const collection = connection.db.collection('posts');

  // Get all posts
  router.get('/', async (req, res) => {
    try {
      const posts = await collection.find().toArray();
      res.json(posts);
    } catch (err) {
      console.error('Error getting posts:', err);
      res.status(500).json({ message: err.message });
    }
  });

  // Get one post
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
      }
      const post = await collection.findOne({ _id: new ObjectId(id) });
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } catch (err) {
      console.error('Error getting post:', err);
      res.status(500).json({ message: err.message });
    }
  });

  // Create a post
  router.post('/', async (req, res) => {
    const { title, content } = req.body;
    console.log('Request body:', req.body);
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = { title, content };
    try {
      const result = await collection.insertOne(post);
      res.status(201).json(result.insertedId ? { _id: result.insertedId, ...post } : post);
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ message: err.message });
    }
  });

  // Update a post
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    console.log('Request body:', req.body);
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
      }
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { title, content } },
        { returnOriginal: false }
      );
      if (!result.value) return res.status(404).json({ message: 'Post not found' });
      res.json(result.value);
    } catch (err) {
      console.error('Error updating post:', err);
      res.status(500).json({ message: err.message });
    }
  });

  // Delete a post
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid post ID' });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (!result.deletedCount) return res.status(404).json({ message: 'Post not found' });
      res.json({ message: 'Post deleted' });
    } catch (err) {
      console.error('Error deleting post:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
