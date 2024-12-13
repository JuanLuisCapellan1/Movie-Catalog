const express = require('express')

const categoriesRouter = express.Router()
const categoryControllers = require('../Controllers/categoriesControllers')

categoriesRouter.get('/categories', categoryControllers.loadCategoriesData)
categoriesRouter.post('/category', categoryControllers.saveNewCategory)
categoriesRouter.put('/category', categoryControllers.updateCategoryData)
categoriesRouter.delete('/category', categoryControllers.deleteCategoryData)

module.exports = categoriesRouter