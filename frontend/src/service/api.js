import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

export const fetchPosts = () => axios.get(API_URL);

export const createPost = (newPost) => axios.post(API_URL, newPost);

export const updatePost = (id, updatedPost) => axios.put(`${API_URL}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);