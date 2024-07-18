import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostById, updatePost } from '../api/posts';

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
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };
    console.log('Submitting post:', post);

    try {
      if (id) {
        await updatePost(id, post);
        navigate(`/post/${id}`); // 문자열 보간을 백틱으로 감쌈
      } else {
        const response = await createPost(post);
        navigate(`/post/${response.data._id}`); // 새로 생성된 글의 ID를 사용하여 이동
      }
    } catch (error) {
      console.error('Error while submitting post:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default PostForm;
