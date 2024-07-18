import axios from 'axios';

const API_URL = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(API_URL);

export const fetchPostById = (id) => axios.get(`${API_URL}/${id}`);

export const createPost = (post) => axios.post(API_URL, post);

export const updatePost = (id, post) => axios.put(`${API_URL}/${id}`, post);

export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
