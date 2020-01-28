const router = require('express').Router();

let Movie = require('../models/Movie');

router.route('/').get((req, res) => {
  Movie.find()
       .then(movies => res.json(movies))
       .catch(err => res.status(400).json('Error: ' + err));

  // res.json({message: "You are trying to see a list of movies"});
});

router.route("/:id").get((req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
       .then(result => {
            if(!result) {
                return res.status(404).json({
                    message: "Movie not found with id " + movieId
                });
            }
            res.json(result);
       })
       .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Movie not found with id " + movieId
                });
            }
            return res.status(500).json({
                message: "Error retrieving movie with id " + movieId
            });
       });

});

router.route("/").post((req, res) => {
  const movie = req.body;
  //validate movie
  if(!movie.title) {
      return res.status(400).json({
          message: "Movie title can not be empty"
      });
  }

  const newMovie = new Movie(movie);

  newMovie.save()
          .then(data => {
            res.json(data);
          })
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").put((req, res) => {
  const movieId = req.params.id;
  const newMovie = req.body;

  if(!newMovie.title) {
      return res.status(400).json({
          message: "Movie title can not be empty"
      });
  }

  // Find movie and update it with the request body
  Movie.findByIdAndUpdate(movieId, newMovie, {new: true})
  .then(movie => {
      if(!movie) {
          return res.status(404).json({
              message: "Movie not found with id " + movieId
          });
      }
      res.json(movie);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).json({
              message: "Movie not found with id " + movieId
          });
      }
      return res.status(500).json({
          message: "Error updating movie with id " + movieId
      });
  });

});

router.route("/:id").delete((req, res) => {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
      .then(movie => {
          if(!movie) {
              return res.status(404).json({
                  message: "Movie not found with id " + movieId
              });
          }
          res.json({message: "Movie deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).json({
                  message: "Movie not found with id " + movieId
              });
          }
          return res.status(500).send({
              message: "Could not delete movie with id " + movieId
          });
      });
});


module.exports = router;
