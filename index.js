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

let topMovies = [
  {
    title: 'Movie 1',
    director: 'Director 1'
  },
  {
    title: 'Movie 2',
    director: 'Director 2'
  },
  {
    title: 'Movie 3',
    director: 'Director 3'
  },
  {
    title: 'Movie 4',
    director: 'Director 4'
  }, {
    title: 'Movie 5',
    director: 'Director 5'
  }, {
    title: 'Movie 6',
    director: 'Director 6'
  }, {
    title: 'Movie 7',
    director: 'Director 7'
  }, {
    title: 'Movie 8',
    director: 'Director 8'
  }, {
    title: 'Movie 9',
    director: 'Director 9'
  }, {
    title: 'Movie 10',
    director: 'Director 10'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to MyFlix Application!');
});


app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});