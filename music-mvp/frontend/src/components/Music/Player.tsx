import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';

export const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
  } = usePlayer();

  if (!currentSong) {
    return null;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-light-gray border-t border-gray-700 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-spotify-gray rounded flex-shrink-0"></div>
          <div className="min-w-0">
            <h4 className="text-white text-sm font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousSong}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaStepBackward size={16} />
            </button>

            <button
              onClick={isPlaying ? pauseSong : resumeSong}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>

            <button
              onClick={nextSong}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaStepForward size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${progressPercentage}%, #4B5563 ${progressPercentage}%, #4B5563 100%)`,
                }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <FaVolumeUp className="text-gray-400" size={16} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume * 100}%, #4B5563 ${volume * 100}%, #4B5563 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};