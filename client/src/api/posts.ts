import axios from 'axios';
import { Post } from '../types/post';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with deployed URL later

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, '_id' | 'createdAt'>): Promise<Post> => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const updatePost = async (id: string, post: Partial<Post>): Promise<Post> => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};