import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPost, setEditPost] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    // 서버에서 게시글 가져오기
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // 새 게시글 입력 변경 처리
  const handleInputChange = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  // 게시글 수정 입력 변경 처리
  const handleEditInputChange = (event) => {
    setEditPost({ ...editPost, [event.target.name]: event.target.value });
  };

  // 새 게시글 생성
  const handleCreate = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    axios.post('http://localhost:5000/api/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '', author: '' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  // 게시글 수정 시작
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditPost({ title: post.title, content: post.content, author: post.author });
  };

  // 게시글 업데이트
  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/posts/${editingPostId}`, editPost)
      .then(response => {
        const updatedPosts = posts.map(post => {
          if (post._id === editingPostId) {
            return response.data;
          }
          return post;
        });
        setPosts(updatedPosts);
        setEditingPostId(null);
        setEditPost({ title: '', content: '', author: '' });
      })
      .catch(error => console.error('Error updating post:', error));
  };

  // 게시글 삭제
  const handleDelete = (postId) => {
    axios.delete(`http://localhost:5000/api/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
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
        <form onSubmit={handleCreate} className="w-full bg-white p-6 rounded-lg shadow mb-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            rows="4"
          ></textarea>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Post
          </button>
        </form>

        {/* 게시글 리스트 */}
        {posts.map(post => (
          <article key={post._id} className="w-full bg-white p-4 rounded-lg shadow mb-4">
            {editingPostId === post._id ? (
              // 게시글 수정 폼
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editPost.title}
                  onChange={handleEditInputChange}
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={editPost.content}
                  onChange={handleEditInputChange}
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={editPost.author}
                  onChange={handleEditInputChange}
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPostId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // 게시글 내용 표시
              <>
                <h2 className="text-xl font-bold text-blue-600">{post.title}</h2>
                <p className="mt-2 text-gray-700">{post.content}</p>
                <p className="mt-1 text-gray-500 text-sm">
                  <small>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</small>
                </p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </main>
      <footer className="bg-gray-800 text-white w-full py-2 text-center mt-auto">
        <p>© 2024 My Blog</p>
      </footer>
    </div>
  );
}

export default App;