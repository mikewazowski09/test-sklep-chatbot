const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  duration: {
    type: Number, // duration in seconds
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: '/images/default-cover.jpg'
  },
  genre: {
    type: String,
    trim: true
  },
  year: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);