import axios from 'axios';
import { AuthResponse, User, Song, Playlist } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Songs API
export const songsAPI = {
  getAllSongs: async (): Promise<Song[]> => {
    const response = await api.get('/songs');
    return response.data;
  },

  getSongById: async (id: string): Promise<Song> => {
    const response = await api.get(`/songs/${id}`);
    return response.data;
  },

  searchSongs: async (query: string): Promise<Song[]> => {
    const response = await api.get(`/songs/search/${query}`);
    return response.data;
  },

  initSampleData: async (): Promise<{ message: string; count?: number }> => {
    const response = await api.post('/songs/init-sample-data');
    return response.data;
  },
};

// Playlists API
export const playlistsAPI = {
  getMyPlaylists: async (): Promise<Playlist[]> => {
    const response = await api.get('/playlists/my');
    return response.data;
  },

  getPlaylistById: async (id: string): Promise<Playlist> => {
    const response = await api.get(`/playlists/${id}`);
    return response.data;
  },

  createPlaylist: async (name: string, description?: string, isPublic?: boolean): Promise<Playlist> => {
    const response = await api.post('/playlists', { name, description, isPublic });
    return response.data;
  },

  updatePlaylist: async (id: string, name?: string, description?: string, isPublic?: boolean): Promise<Playlist> => {
    const response = await api.put(`/playlists/${id}`, { name, description, isPublic });
    return response.data;
  },

  deletePlaylist: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/playlists/${id}`);
    return response.data;
  },

  addSongToPlaylist: async (playlistId: string, songId: string): Promise<Playlist> => {
    const response = await api.post(`/playlists/${playlistId}/songs`, { songId });
    return response.data;
  },

  removeSongFromPlaylist: async (playlistId: string, songId: string): Promise<Playlist> => {
    const response = await api.delete(`/playlists/${playlistId}/songs/${songId}`);
    return response.data;
  },
};

export default api;