const mongoose = require('mongoose')

let movieSchema = mongoose.Schema ({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      director: {
        name: String,
        bio: String,
        birthYear: Number,
        deathYear: Number,
      },
      genre: {
        name: String,
        description: String,
      },
      releaseYear: Number,
      imageURL: String,
      featured: {
        type: Boolean,
        default: false,
      },
    });

let userSchema = mongoose.Schema({
    Username: {
      type: String,
      required: true,
      unique: true
    },
    Password: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Birthday: Date,
    FavoriteMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
      }
    ]
  });

  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;