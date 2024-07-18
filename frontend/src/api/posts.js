import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버 주소
});

export const fetchPosts = () => api.get('/posts');
export const fetchPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);
