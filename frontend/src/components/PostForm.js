import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostById, updatePost } from '../api/posts';
import { Container, Form, Button } from 'react-bootstrap';

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      fetchPostById(id).then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      }).catch(error => {
        console.error('Error fetching post:', error);
        alert('Error fetching post');
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };

    try {
      if (id) {
        const response = await updatePost(id, post);
        if (response.status === 200) {
          alert('수정되었습니다.');
          navigate('/');
        } else {
          console.error('Error updating post:', response);
          alert('Error: ' + (response.data?.message || 'Unknown error'));
        }
      } else {
        const response = await createPost(post);
        if (response.status === 201) {
          navigate(`/post/${response.data._id}`);
        } else {
          console.error('Error creating post:', response);
          alert('Error: ' + (response.data?.message || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Error while submitting post:', error.response || error.message || error);
      alert('Error: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  return (
    <Container>
      <h1 className="mt-4">{id ? 'Edit Post' : 'New Post'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Create'}
        </Button>
      </Form>
    </Container>
  );
}

export default PostForm;
