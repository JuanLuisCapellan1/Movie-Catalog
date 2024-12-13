const express = require('express');
const config = require('./config');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors("http://localhost:5000"));

const categoriesRoutes = require('./Routes/CategoriesRoutes')
const moviesRoutes = require('./Routes/MoviesRoutes')

db.connectDb();

app.use('/api', categoriesRoutes)
app.use('/api', moviesRoutes)

app.listen(config.PORT, () => {
  console.log(`App listening on Port ${config.PORT}`);
})