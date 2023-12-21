const mongoose = require('mongoose')

let movieSchema = mongoose.Schema ({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function() {
        return new mongoose.Types.ObjectId();
    }
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
        customId: {
          type: String,
          default: function () {
            // Custom ID generation logic for the genre
            return this.genre.name.replace(/\s/g, '_');
          },
        },
      }, 
      releaseYear: Number,
      imageURL: String,
      featured: {
        type: Boolean,
        default: false,
      },
    });

let userSchema = mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: function() {
        return new mongoose.Types.ObjectId();
     }
    },
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

  let movie = mongoose.model('movie', movieSchema);
  let user = mongoose.model('user', userSchema);
  
  module.exports.movie = movie;
  module.exports.user = user;