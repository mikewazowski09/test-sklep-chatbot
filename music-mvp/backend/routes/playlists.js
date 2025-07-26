const express = require('express');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's playlists
router.get('/my', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id })
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get playlist by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('songs')
      .populate('owner', 'username');
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Check if user can access this playlist
    if (!playlist.isPublic && playlist.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    const playlist = new Playlist({
      name,
      description,
      owner: req.user._id,
      isPublic: isPublic || false
    });

    await playlist.save();
    
    // Add playlist to user's playlists
    await User.findByIdAndUpdate(req.user._id, {
      $push: { playlists: playlist._id }
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update playlist
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;
    playlist.isPublic = isPublic !== undefined ? isPublic : playlist.isPublic;

    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    // Remove playlist from user's playlists
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { playlists: req.params.id }
    });

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add song to playlist
router.post('/:id/songs', auth, async (req, res) => {
  try {
    const { songId } = req.body;
    
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ error: 'Song already in playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();

    await playlist.populate('songs');
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove song from playlist
router.delete('/:id/songs/:songId', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    playlist.songs = playlist.songs.filter(
      songId => songId.toString() !== req.params.songId
    );
    
    await playlist.save();
    await playlist.populate('songs');
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;