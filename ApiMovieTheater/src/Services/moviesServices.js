const { sqlConfig } = require("../db")
const sql = require('mssql')

async function getAllMovies(id) {
  const pool = await sql.connect(sqlConfig);

  const result = await pool.request()
    .input('movieId', sql.Int, id)
    .execute('sp_GetMovies');

  const movies = result.recordsets[0]
  if (!movies.length) {
    throw new Error("Provided Movie Id doesn't exist");
  }
  return movies
}

async function getAllMoviesByCategory(categoryId) {
  const pool = await sql.connect(sqlConfig);

  const result = await pool.request()
    .input('categoryID', sql.Int, categoryId)
    .execute('sp_GetMoviesInfo');

  const movies = result.recordsets[0]
  if (!movies.length) {
    throw new Error("Provided Category Id doesn't exist");
  }
  return movies
}


async function createMovie(data) {
  const { title, description, poster, rating } = data;
  const pool = await sql.connect(sqlConfig);

  const result = await pool.request()
    .input('title', sql.VarChar(150), title)
    .input('description', sql.VarChar(sql.MAX), description)
    .input('poster', sql.VarChar(250), poster)
    .input('rating', sql.Decimal(3, 2), rating)
    .execute('sp_CreateMovie');

  return result.rowsAffected.length > 0
    ? 'Movie Created Successfully!'
    : 'Error while trying to create a new movie!';
}

async function updateMovie(id, data) {
  await getAllMovies(id)
  const { title, description, poster, rating } = data;
  const pool = await sql.connect(sqlConfig);

  const result = await pool.request()
    .input('movieID', sql.Int, id)
    .input('title', sql.VarChar(150), title)
    .input('description', sql.VarChar(sql.MAX), description)
    .input('poster', sql.VarChar(250), poster)
    .input('rating', sql.Decimal(3, 2), rating)
    .execute('sp_UpdateMovie');

  return result.rowsAffected.length > 0
    ? 'Movie Updated Successfully!'
    : 'Error while trying to update the movie!';
}

async function deleteMovie(id) {
  await getAllMovies(id)
  const pool = await sql.connect(sqlConfig);

  const result = await pool.request()
    .input('movieID', sql.Int, id)
    .execute('sp_DeleteMovie');

  return result.rowsAffected.length > 0
    ? 'Movie Deleted Successfully!'
    : 'Error while trying to delete the movie!';
}


module.exports = { createMovie, getAllMovies, getAllMoviesByCategory, updateMovie, deleteMovie }