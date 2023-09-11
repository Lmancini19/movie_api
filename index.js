const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs'); 
const path = require('path');

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// for static 'documentation' page 
app.use(express.static('public'));

let movies = [
  {
    title: 'Movie Title 1',
    description: 'Movie description 1',
    genre: 'Action',
    director: 'Director Name 1',
    imageUrl: 'https://example.com/image1.jpg',
    featured: true,
  },
  {
    title: 'Movie Title 2',
    description: 'Movie description 2',
    genre: 'Comedy',
    director: 'Director Name 2',
    imageUrl: 'https://example.com/image2.jpg',
    featured: false,
  },
  {
    title: 'Movie Title 3',
    description: 'Movie description 3',
    genre: 'Action',
    director: 'Director Name 3',
    imageUrl: 'https://example.com/image3.jpg',
    featured: true,
  },
  {
    title: 'Movie Title 4',
    description: 'Movie description 4',
    genre: 'Comedy',
    director: 'Director Name 4',
    imageUrl: 'https://example.com/image4.jpg',
    featured: false,
  },
  {
    title: 'Movie Title 5',
    description: 'Movie description 5',
    genre: 'Action',
    director: 'Director Name 5',
    imageUrl: 'https://example.com/image5.jpg',
    featured: true,
  },
  {
    title: 'Movie Title 6',
    description: 'Movie description 6',
    genre: 'Comedy',
    director: 'Director Name 6',
    imageUrl: 'https://example.com/image6.jpg',
    featured: false,
  },
  {
    title: 'Movie Title 7',
    description: 'Movie description 7',
    genre: 'Action',
    director: 'Director Name 7',
    imageUrl: 'https://example.com/image7.jpg',
    featured: true,
  },
  {
    title: 'Movie Title 8',
    description: 'Movie description 8',
    genre: 'Comedy',
    director: 'Director Name 8',
    imageUrl: 'https://example.com/image8.jpg',
    featured: false,
  }
];

// List All Movies
app.get('/api/movies', (req, res) => {
  try {
    res.json(movies);
  } catch (error) {
    console.error('Error listing movies:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Get Movie by Title
app.get('/api/movies/:title', (req, res) => {
  try {
    const title = req.params.title;
    const movie = movies.find((m) => m.title === title);
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

// Get Genre by Name
app.get('/api/genres/:name', (req, res) => {
  try {
    const name = req.params.name;
    // Example genre data (for illustration purposes)
    const genre = {
      name: name,
      description: 'Genre description for ' + name,
    };
    res.json(genre);
  } catch (error) {
    console.error('Error getting genre by name:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Get Director by Name
app.get('/api/directors/:name', (req, res) => {
  try {
    const name = req.params.name;
    // Example director data (for illustration purposes)
    const director = {
      name: name,
      bio: 'Director bio for ' + name,
      birthYear: 1980,
      deathYear: null,
    };
    res.json(director);
  } catch (error) {
    console.error('Error getting director by name:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// User Registration 
app.post('/api/users/register', (req, res) => {
  try {
    // Handle user registration logic here
    res.send('User registration successful.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Update User Info 
app.put('/api/users/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    // Handle user info update logic here
    res.send('User info updated successfully.');
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Add Movie to Favorites 
app.post('/api/users/:userId/favorites', (req, res) => {
  try {
    const userId = req.params.userId;
    // Handle adding a movie to favorites logic here
    res.send('Movie added to favorites successfully.');
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    res.status(500).send('Something went wrong.');
  }
});

// Remove Movie from Favorites
app.delete('/api/users/:userId/favorites/:movieId', (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    // Handle removing a movie from favorites logic here
    res.send('Movie removed from favorites successfully.');
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    res.status(500).send('Something went wrong.');
  }
});

// User Deregistration 
app.delete('/api/users/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    // Handle user deregistration logic here
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