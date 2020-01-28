const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: String
});

const MovieSchema = new mongoose.Schema({
  imdb_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: [GenreSchema],
    required: true
  }
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
