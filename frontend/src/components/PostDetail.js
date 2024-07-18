import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../api/posts';
import { Container, Button } from 'react-bootstrap';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then(response => setPost(response.data))
      .catch(error => {
        console.error('Error fetching post:', error);
        navigate('/'); // 오류 발생 시 목록 페이지로 이동
      });
  }, [id, navigate]);

  const handleDelete = () => {
    deletePost(id)
      .then(() => {
        alert('삭제되었습니다.');
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <h1 className="mt-4">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
      <div className="mt-4">
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
        <Button variant="primary" as={Link} to={`/edit/${id}`} className="ms-2">Edit</Button>
      </div>
    </Container>
  );
}

export default PostDetail;
