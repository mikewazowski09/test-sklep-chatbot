import React, { useState } from 'react';
import { Song } from '../../types';
import { usePlayer } from '../../contexts/PlayerContext';
import { FaPlay, FaPause, FaPlus } from 'react-icons/fa';

interface SongCardProps {
  song: Song;
  onAddToPlaylist?: (song: Song) => void;
  playlist?: Song[];
}

export const SongCard: React.FC<SongCardProps> = ({ song, onAddToPlaylist, playlist = [] }) => {
  const { currentSong, isPlaying, playSong, pauseSong, resumeSong } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlayClick = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        resumeSong();
      }
    } else {
      playSong(song, playlist);
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="bg-spotify-light-gray p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-spotify-gray rounded flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="text-white hover:text-spotify-green transition-colors"
            >
              {isCurrentSong && isPlaying ? (
                <FaPause size={16} />
              ) : (
                <FaPlay size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{song.title}</h3>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
          {song.album && (
            <p className="text-gray-500 text-xs truncate">{song.album}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <span>{formatDuration(song.duration)}</span>
          {onAddToPlaylist && (isHovered || window.innerWidth < 768) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist(song);
              }}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Add to playlist"
            >
              <FaPlus size={12} />
            </button>
          )}
        </div>
      </div>

      {song.genre && (
        <div className="mt-2">
          <span className="inline-block bg-spotify-gray text-gray-300 text-xs px-2 py-1 rounded">
            {song.genre}
          </span>
        </div>
      )}
    </div>
  );
};