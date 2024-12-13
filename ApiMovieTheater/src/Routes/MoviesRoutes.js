const express = require('express')

const moviesRouter = express.Router()
const moviesControllers = require('../Controllers/moviesControllers')

moviesRouter.get('/movies', moviesControllers.getMoviesController)
moviesRouter.get('/moviesByCategory', moviesControllers.getMoviesByCategoriesController)
moviesRouter.post('/movie', moviesControllers.validateCreateMovie, moviesControllers.createMovieController)
moviesRouter.put('/movie', moviesControllers.updateMovieController)
moviesRouter.delete('/movie', moviesControllers.deleteMovieController)

module.exports = moviesRouter
