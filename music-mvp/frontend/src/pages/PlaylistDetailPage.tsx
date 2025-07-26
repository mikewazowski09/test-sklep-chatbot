import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Playlist, Song } from '../types';
import { playlistsAPI } from '../services/api';
import { SongCard } from '../components/Music/SongCard';
import { FaArrowLeft, FaMusic, FaTrash } from 'react-icons/fa';

export const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadPlaylist(id);
    }
  }, [id]);

  const loadPlaylist = async (playlistId: string) => {
    try {
      setLoading(true);
      const data = await playlistsAPI.getPlaylistById(playlistId);
      setPlaylist(data);
    } catch (err: any) {
      setError('Failed to load playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSong = async (songId: string) => {
    if (!playlist || !window.confirm('Remove this song from playlist?')) {
      return;
    }

    try {
      const updatedPlaylist = await playlistsAPI.removeSongFromPlaylist(playlist._id, songId);
      setPlaylist(updatedPlaylist);
    } catch (err: any) {
      setError('Failed to remove song');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error || 'Playlist not found'}</div>
          <Link
            to="/playlists"
            className="bg-spotify-green text-black px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors"
          >
            Back to Playlists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black pb-24">
      {/* Header */}
      <header className="bg-spotify-light-gray p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Link
            to="/playlists"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-2xl font-bold">Playlist Details</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Playlist Info */}
        <div className="bg-spotify-light-gray p-6 rounded-lg mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-32 h-32 bg-spotify-gray rounded-lg flex items-center justify-center flex-shrink-0">
              <FaMusic size={48} className="text-gray-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-3xl font-bold mb-2">{playlist.name}</h2>
              {playlist.description && (
                <p className="text-gray-300 mb-3">{playlist.description}</p>
              )}
              <div className="text-gray-400 text-sm">
                <p>{playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}</p>
                <p>Created: {new Date(playlist.createdAt || '').toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        {playlist.songs.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <FaMusic size={64} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl mb-2">No songs in this playlist</h3>
            <p>Add some songs from the home page!</p>
            <Link
              to="/"
              className="inline-block mt-4 bg-spotify-green text-black px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors"
            >
              Browse Songs
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="text-white text-xl font-semibold mb-4">Songs</h3>
            {playlist.songs.map((song, index) => (
              <div key={song._id} className="flex items-center space-x-3 group">
                <span className="text-gray-400 text-sm w-8">{index + 1}</span>
                <div className="flex-1">
                  <SongCard
                    song={song}
                    playlist={playlist.songs}
                  />
                </div>
                <button
                  onClick={() => handleRemoveSong(song._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2"
                  title="Remove from playlist"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};