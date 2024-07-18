import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/posts';
import { Container, ListGroup, Button } from 'react-bootstrap';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(response => setPosts(response.data));
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Posts</h1>
        <Button as={Link} to="/new" variant="primary">New Post</Button>
      </div>
      <ListGroup className="mt-4">
        {posts.map(post => (
          <ListGroup.Item key={post._id} action as={Link} to={`/post/${post._id}`}>
            {post.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default PostList;
