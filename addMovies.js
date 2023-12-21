// Filename: addMovies.js

const mongoose = require('mongoose');
const models = require('./models.js');
const movie = models.movie;


mongoose.connect('mongodb://127.0.0.1:27017/myFlixApp', { useNewUrlParser: true, useUnifiedTopology: true });


const moviesToAdd = [
  {
    title: 'Jurassic Park',
    description: 'Dinosaurs come back to life in this action-packed adventure!',
    director: {
      name: 'Steven Spielberg',
      bio: 'Renowned director known for his captivating storytelling and groundbreaking films.',
      birthYear: 1946,
      deathYear: null
    },
    genre: {
      name: 'Action/Adventure',
      description: 'Exciting adventures with a mix of action elements.'
    },
    releaseYear: 1993,
    imageURL: 'https://www.imdb.com/title/tt0107290/mediaviewer/rm3845245952/?ref_=tt_md_2',
    featured: false
  },
  {
    title: 'E.T. the Extra-Terrestrial',
    description: 'A young boy befriends an alien stranded on Earth.',
    director: {
      name: 'Steven Spielberg',
      bio: 'Renowned director known for his captivating storytelling and groundbreaking films.',
      birthYear: 1946,
      deathYear: null
    },
    genre: {
      name: 'Science Fiction',
      description: 'Exploring imaginative and futuristic concepts.'
    },
    releaseYear: 1982,
    imageURL: 'https://www.imdb.com/title/tt0083866/mediaviewer/rm512828160/?ref_=tt_md_3',
    featured: false
  },
  {
    title: 'Inception',
    description: 'A thief enters people\'s dreams to steal their secrets.',
    director: {
      name: 'Christopher Nolan',
      bio: 'Acclaimed filmmaker known for mind-bending narratives and visually stunning movies.',
      birthYear: 1970,
      deathYear: null
    },
    genre: {
      name: 'Science Fiction',
      description: 'Exploring imaginative and futuristic concepts.'
    },
    releaseYear: 2010,
    imageURL: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm918520576/?ref_=tt_md_7',
    featured: true
  },
  {
    title: 'Interstellar',
    description: 'A journey through space to save humanity.',
    director: {
      name: 'Christopher Nolan',
      bio: 'Acclaimed filmmaker known for mind-bending narratives and visually stunning movies.',
      birthYear: 1970,
      deathYear: null
    },
    genre: {
      name: 'Science Fiction',
      description: 'Exploring imaginative and futuristic concepts.'
    },
    releaseYear: 2014,
    imageURL: 'https://www.imdb.com/title/tt0816692/mediaviewer/rm1728576256/?ref_=tt_md_2',
    featured: true
  },
  {
    title: 'Pulp Fiction',
    description: 'A nonlinear narrative of crime and redemption.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Influential filmmaker known for his unique style and storytelling',
      birthYear: 1963,
      deathYear: null
    },
    genre: {
      name: 'Crime/Drama',
      description: 'Exploring criminal activities and dramatic storytelling.'
    },
    releaseYear: 1994,
    imageURL: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm3998665728/?ref_=tt_md_1',
    featured: false
  },
  {
    title: 'Kill Bill: Vol. 1',
    description: 'A woman seeks vengeance against her former colleagues.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Influential filmmaker known for his unique style and storytelling.',
      birthYear: 1963,
      deathYear: null
    },
    genre: {
      name: 'Action/Crime',
      description: 'Combining action and crime elements in an engaging narrative.'
    },
    releaseYear: 2003,
    imageURL: 'https://www.imdb.com/title/tt0266697/mediaviewer/rm2186293248/?ref_=tt_md_3',
    featured: false
  },
  {
    title: 'Saving Private Ryan',
    description: 'A group of soldiers search for a paratrooper during World War II.',
    director: {
      name: 'Steven Spielberg',
      bio: 'Renowned director known for his captivating storytelling and groundbreaking films.',
      birthYear: 1946,
      deathYear: null
    },
    genre: {
      name: 'War/Drama',
      description: 'Intense and emotional dramas set against the backdrop of war.'
    },
    releaseYear: 1998,
    imageURL: 'https://www.imdb.com/title/tt0120815/mediaviewer/rm2055746561/?ref_=tt_md_2',
    featured: false
  },
  {
    title: 'The Dark Knight',
    description: 'The Joker challenges Batman in this dark superhero film.',
    director: {
      name: 'Christopher Nolan',
      bio: 'Acclaimed filmmaker known for mind-bending narratives and visually stunning movies.',
      birthYear: 1970,
      deathYear: null
    },
    genre: {
      name: 'Superhero/Action',
      description: 'Exciting action with a superheroic twist.'
    },
    releaseYear: 2008,
    imageURL: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm3252125696/?ref_=tt_md_3',
    featured: true
  },
  {
    title: 'Django Unchained',
    description: 'A former slave becomes a bounty hunter in the pre-Civil War United States.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Influential filmmaker known for his unique style and storytelling.',
      birthYear: 1963,
      deathYear: null
    },
    genre: {
      name: 'Western/Crime',
      description: 'Combining elements of the Western genre with crime narratives.'
    },
    releaseYear: 2012,
    imageURL: 'https://www.imdb.com/title/tt1853728/mediaviewer/rm3961302784/?ref_=tt_md_1',
    featured: false
  },
  {
    title: 'Schindler\'s List',
    description: 'A businessman saves Jewish lives during the Holocaust.',
    director: {
      name: 'Steven Spielberg',
      bio: 'Renowned director known for his captivating storytelling and groundbreaking films.',
      birthYear: 1946,
      deathYear: null
    },
    genre: {
      name: 'Drama/History',
      description: 'Dramatic narratives set against historical events.'
    },
    releaseYear: 1993,
    imageURL: 'https://www.imdb.com/title/tt0108052/mediaviewer/rm1008307712/?ref_=tt_md_2',
    featured: true
  }
];

// Save the array of movie documents to the database
movie.insertMany(moviesToAdd)
  .then((savedMovies) => {
    console.log('Movies added:', savedMovies);
  })
  .catch((error) => {
    console.error('Error adding movies:', error);
  })
  .finally(() => {
    // Close the connection after saving
    mongoose.disconnect();
  });
