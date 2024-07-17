import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const fetchPosts = () => api.get('/posts');
export const fetchPostById = (id) => api.get('/posts/${id}');
export const createPost = (post) => api.get('/posts',post);
export const updatePost = (id,post) => api.get('/posts/${id}',post);
export const deletePosts = (id) => api.get('/posts/${id}');
