import React, { useEffect, useState } from 'react';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "./service/api";
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);

  // 게시글 목록 가져오기
  useEffect(() => {
    fetchPosts()
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // 새 게시글 생성
  const handleCreate = (newPost) => {
    createPost(newPost)
      .then(response => {
        setPosts([...posts, response.data]);
      })
      .catch(error => console.error('Error creating post:', error));
  };

  // 게시글 업데이트
  const handleUpdate = (id, updatedPost) => {
    updatePost(id, updatedPost)
      .then(response => {
        const updatedPosts = posts.map(post => {
          if (post._id === id) {
            return response.data;
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch(error => console.error('Error updating post:', error));
  };

  // 게시글 삭제
  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter(post => post._id !== id));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 w-full text-white py-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">My Blog</h1>
      </header>
      <main className="flex flex-col items-center w-full p-6 max-w-2xl">
        {/* 새 게시글 작성 폼 */}
        <PostForm onSubmit={handleCreate} />

        {/* 게시글 목록 */}
        <PostList
          posts={posts}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </main>
      <footer className="bg-gray-800 text-white w-full py-2 text-center mt-auto">
        <p>© 2024 My Blog</p>
      </footer>
    </div>
  );
}

export default App;