import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Song, Playlist } from '../types';
import { songsAPI, playlistsAPI } from '../services/api';
import { SongCard } from '../components/Music/SongCard';
import { useAuth } from '../contexts/AuthContext';

export const HomePage: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const { user, logout } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [songsData, playlistsData] = await Promise.all([
        songsAPI.getAllSongs(),
        playlistsAPI.getMyPlaylists(),
      ]);

      if (songsData.length === 0) {
        await songsAPI.initSampleData();
        const refreshedSongs = await songsAPI.getAllSongs();
        setSongs(refreshedSongs);
      } else {
        setSongs(songsData);
      }

      setPlaylists(playlistsData);
    } catch (err: any) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadData();
      return;
    }

    try {
      const searchResults = await songsAPI.searchSongs(searchQuery);
      setSongs(searchResults);
    } catch (err: any) {
      setError('Search failed');
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setShowPlaylistModal(true);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim() || !selectedSong) return;

    try {
      const newPlaylist = await playlistsAPI.createPlaylist(newPlaylistName);
      await playlistsAPI.addSongToPlaylist(newPlaylist._id, selectedSong._id);
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowPlaylistModal(false);
      setSelectedSong(null);
    } catch (err: any) {
      setError('Failed to create playlist');
    }
  };

  const handleAddToExistingPlaylist = async (playlistId: string) => {
    if (!selectedSong) return;

    try {
      await playlistsAPI.addSongToPlaylist(playlistId, selectedSong._id);
      setShowPlaylistModal(false);
      setSelectedSong(null);
    } catch (err: any) {
      setError('Failed to add song to playlist');
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
          <h1 className="text-white text-2xl font-bold">Music MVP</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.username}</span>
            <Link
              to="/playlists"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
            >
              My Playlists
            </Link>
            <button
              onClick={logout}
              className="bg-spotify-green text-black px-4 py-2 rounded font-semibold hover:bg-green-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 bg-spotify-gray border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
          <button
            onClick={handleSearch}
            className="bg-spotify-green text-black px-6 py-2 rounded font-semibold hover:bg-green-400 transition-colors"
          >
            Search
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Songs List */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold mb-4">
            {searchQuery ? `Search Results (${songs.length})` : `All Songs (${songs.length})`}
          </h2>
          {songs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              onAddToPlaylist={handleAddToPlaylist}
              playlist={songs}
            />
          ))}
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-spotify-light-gray p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Add "{selectedSong?.title}" to playlist
            </h3>

            {/* Existing Playlists */}
            {playlists.length > 0 && (
              <div className="mb-4">
                <h4 className="text-gray-300 text-sm mb-2">Existing Playlists:</h4>
                <div className="space-y-2">
                  {playlists.map((playlist) => (
                    <button
                      key={playlist._id}
                      onClick={() => handleAddToExistingPlaylist(playlist._id)}
                      className="w-full text-left p-2 bg-spotify-gray text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      {playlist.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Create New Playlist */}
            <div className="space-y-3">
              <h4 className="text-gray-300 text-sm">Create New Playlist:</h4>
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-3 py-2 bg-spotify-gray border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylistName.trim()}
                  className="bg-spotify-green text-black px-4 py-2 rounded font-semibold hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                  Create & Add
                </button>
                <button
                  onClick={() => {
                    setShowPlaylistModal(false);
                    setSelectedSong(null);
                    setNewPlaylistName('');
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};