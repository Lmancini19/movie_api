const mongoose = require('mongoose');
const Models = require('./models.js');
const Movie = Models.Movie;
const User = Models.User;
const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs'); 
const path = require('path');

// import body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mongoose to db
mongoose.connect('mongodb://127.0.0.1:27017/myFlixApp', { useNewUrlParser: true, useUnifiedTopology: true });

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// for static 'documentation' page 
app.use(express.static('public'));

// Return a list of ALL movies to the user
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    console.error('Error listing movies:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Return data about a single movie by title to the user
app.get('/api/movies/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const movie = await Movie.findOne({ title: title });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found.' });
    }
  } catch (error) {
    console.error('Error getting movie by title:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Return data about a genre by name/title
app.get('/api/genres/:name', async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();

    const movieWithGenre = await Movie.findOne({ 'genre.name': new RegExp('^' + name + '$', 'i') });

    if (movieWithGenre) {
      res.json(movieWithGenre.genre);
    } else {
      res.status(404).json({ error: 'Genre not found.' });
    }
  } catch (error) {
    console.error('Error getting genre by name:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


// Return data about a director by name
app.get('/api/directors/:name', async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();

    const movieWithDirector = await Movie.findOne({ 'director.name': new RegExp('^' + name + '$', 'i') });

    if (movieWithDirector) {
      res.json(movieWithDirector.director);
    } else {
      res.status(404).json({ error: 'Director not found.' });
    }
  } catch (error) {
    console.error('Error getting  by name:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


// User Registration 
app.post('/api/users/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      const newUser = await User.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Update User Info 
app.put('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Add Movie to Favorites 
app.post('/api/users/:userId/favorites', async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.body.movieId; // Assuming the movieId is provided in the request body
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { FavoriteMovies: movieId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Remove Movie from Favorites
app.delete('/api/users/:userId/favorites/:movieId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { FavoriteMovies: movieId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    res.status(500).send('Something went wrong.');
  }
});

// User Deregistration 
app.delete('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findOneAndDelete(userId);
    res.send('User deregistered successfully.');
  } catch (error) {
    console.error('Error deregistering user:', error);
    res.status(500).send('Something went wrong.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});