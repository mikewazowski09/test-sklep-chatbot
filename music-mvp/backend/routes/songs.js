const express = require('express');
const Song = require('../models/Song');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search songs
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize with sample data (for development)
router.post('/init-sample-data', async (req, res) => {
  try {
    // Check if songs already exist
    const existingSongs = await Song.countDocuments();
    if (existingSongs > 0) {
      return res.json({ message: 'Sample data already exists' });
    }

    const sampleSongs = [
      {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: 355,
        audioUrl: "/audio/sample1.mp3",
        genre: "Rock",
        year: 1975
      },
      {
        title: "Imagine",
        artist: "John Lennon",
        album: "Imagine",
        duration: 183,
        audioUrl: "/audio/sample2.mp3",
        genre: "Rock",
        year: 1971
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: 391,
        audioUrl: "/audio/sample3.mp3",
        genre: "Rock",
        year: 1976
      },
      {
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        duration: 294,
        audioUrl: "/audio/sample4.mp3",
        genre: "Pop",
        year: 1983
      },
      {
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        duration: 301,
        audioUrl: "/audio/sample5.mp3",
        genre: "Grunge",
        year: 1991
      }
    ];

    await Song.insertMany(sampleSongs);
    res.json({ message: 'Sample data created successfully', count: sampleSongs.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;