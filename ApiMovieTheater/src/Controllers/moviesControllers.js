const { validationResult, check } = require('express-validator');
const moviesServices = require('../Services/moviesServices')

const validateCreateMovie = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  check('poster')
    .notEmpty()
    .withMessage('Poster URL is required')
    .isURL()
    .withMessage('Poster must be a valid URL'),
  check('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a decimal between 0 and 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const getMoviesController = async (req, res) => {
  try {
    const movieId = req.query.id ? parseInt(req.query.id) : null

    if (req.query.id && isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID. It must be a number.',
      });
    }

    const movies = await moviesServices.getAllMovies(movieId)

    return res.status(200).json({
      success: true,
      data: movies,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const getMoviesByCategoriesController = async (req, res) => {
  try {
    const categoryId = req.query.id ? parseInt(req.query.id) : null

    if (req.query.id && isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Category Id, must be a number.',
      });
    }

    const movies = await moviesServices.getAllMoviesByCategory(categoryId)

    return res.status(200).json({
      success: true,
      data: movies,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}


const createMovieController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, poster, rating } = req.body;

    const result = await moviesServices.createMovie({ title, description, poster, rating });

    return res.status(201).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const updateMovieController = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.query
    const { title, description, poster, rating } = req.body

    const result = await moviesServices.updateMovie(id, { title, description, poster, rating });

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const deleteMovieController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.query;

    const result = await moviesServices.deleteMovie(id);

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getMoviesController,
  getMoviesByCategoriesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  validateCreateMovie
}