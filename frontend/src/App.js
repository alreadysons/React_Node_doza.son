import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    // Fetch posts from the server
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleInputChange = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    // Create a new post
    axios.post('http://localhost:5000/api/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '', author: '' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  const handleUpdate = (postId) => {
    // Update a post
    axios.put(`http://localhost:5000/api/posts/${postId}`, newPost)
      .then(response => {
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            return response.data;
          }
          return post;
        });
        setPosts(updatedPosts);
        setNewPost({ title: '', content: '', author: '' });
      })
      .catch(error => console.error('Error updating post:', error));
  };

  const handleDelete = (postId) => {
    // Delete a post
    axios.delete(`http://localhost:5000/api/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <div className="App">
      <header>
        <h1>My Blog</h1>
      </header>
      <main>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
          />
          <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>Create Post</button>
        </form>
        {posts.map(post => (
          <article key={post._id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><small>By {post.author} on {new Date(post.date).toLocaleDateString()}</small></p>
            <button onClick={() => handleUpdate(post._id)} style={{ backgroundColor: 'green', color: 'white', padding: '5px' }}>Update</button>
            <button onClick={() => handleDelete(post._id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px' }}>Delete</button>
          </article>
        ))}
      </main>
      <footer>
        <p>© 2024 My Blog</p>
      </footer>
    </div>
  );
}

export default App;
