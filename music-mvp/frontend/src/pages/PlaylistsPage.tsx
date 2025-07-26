import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Playlist } from '../types';
import { playlistsAPI } from '../services/api';
import { FaMusic, FaTrash } from 'react-icons/fa';

export const PlaylistsPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const data = await playlistsAPI.getMyPlaylists();
      setPlaylists(data);
    } catch (err: any) {
      setError('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) {
      return;
    }

    try {
      await playlistsAPI.deletePlaylist(playlistId);
      setPlaylists(playlists.filter(p => p._id !== playlistId));
    } catch (err: any) {
      setError('Failed to delete playlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black pb-24">
      {/* Header */}
      <header className="bg-spotify-light-gray p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">My Playlists</h1>
          <Link
            to="/"
            className="bg-spotify-green text-black px-4 py-2 rounded font-semibold hover:bg-green-400 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {playlists.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <FaMusic size={64} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-xl mb-2">No playlists yet</h2>
            <p>Create your first playlist by adding songs from the home page!</p>
            <Link
              to="/"
              className="inline-block mt-4 bg-spotify-green text-black px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors"
            >
              Browse Songs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-spotify-light-gray p-4 rounded-lg hover:bg-gray-700 transition-colors group"
              >
                <div className="aspect-square bg-spotify-gray rounded-lg mb-4 flex items-center justify-center">
                  <FaMusic size={48} className="text-gray-500" />
                </div>
                
                <h3 className="text-white font-semibold mb-1 truncate">
                  {playlist.name}
                </h3>
                
                {playlist.description && (
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {playlist.description}
                  </p>
                )}
                
                <p className="text-gray-500 text-xs mb-3">
                  {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                </p>

                <div className="flex space-x-2">
                  <Link
                    to={`/playlist/${playlist._id}`}
                    className="flex-1 bg-spotify-green text-black text-center py-2 px-3 rounded text-sm font-semibold hover:bg-green-400 transition-colors"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => handleDeletePlaylist(playlist._id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    title="Delete playlist"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};