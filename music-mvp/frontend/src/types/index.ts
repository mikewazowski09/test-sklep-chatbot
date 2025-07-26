export interface User {
  id: string;
  username: string;
}

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  audioUrl: string;
  coverImage?: string;
  genre?: string;
  year?: number;
}

export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  owner: User | string;
  songs: Song[];
  isPublic: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
}