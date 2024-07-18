import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../api/posts';

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
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
  );
}

export default PostDetail;
