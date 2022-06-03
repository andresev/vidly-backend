// const express = require('express');
// const Joi = require('joi');
// const port = process.env.PORT || 3000;

// const app = express();

// app.use(express.json());

const express = require('express');
const Joi = require('joi');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    genre: 'comedy',
  },
  {
    id: 2,
    genre: 'action',
  },
];

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello world');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:genre', (req, res) => {
  const genre = genres.find((g) => g.genre === req.params.genre);
  if (!genre) {
    console.log(req.params.genre);
    return res.status(404).send('Genre is not found');
  }

  res.send(genre);
});

app.post('/api/genres/', (req, res) => {
  const result = joiValidate(req, res);
  if (result) {
    return;
  }

  const addGenre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };

  genres.push(addGenre);

  res.send(genres);
});

app.put('/api/genres/:genre', (req, res) => {
  console.log(req.params.genre);
  const genreFound = genres.find((g) => g.genre === req.params.genre);
  if (!genreFound) {
    return res.status(404).send('Genre does not exist!');
  }

  const result = joiValidate(req, res);
  if (result) {
    return;
  }

  genreFound.genre = req.body.genre;
  console.log('made it here!');

  res.send(genreFound);
});

app.delete('/api/genres/:genre', (req, res) => {
  const genre = genres.find((g) => g.genre === req.params.genre);
  if (!genre) {
    return res.status(404).send('Genre does not exist');
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

const joiValidate = (req, res) => {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return true;
  } else {
    return false;
  }
};
