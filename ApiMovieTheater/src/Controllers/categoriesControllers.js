const categoriesServices = require('../Services/categoriesServices')

async function loadCategoriesData(req, res) {
  try {
    const id = req.query.id;
    if (id) {
      if (id <= 0 || isNaN(id)) {
        throw new Error('Invalid Category Id provided!')
      }
      const categories = await categoriesServices.showAllCategories(id)
      return res.status(200).json({
        success: true,
        data: categories,
      })
      return
    }
    const categories = await categoriesServices.showAllCategories()
    return res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    let statusCode = 400

    if (error.message === 'Invalid Category Id provided!') {
      statusCode = 400
    } else if (error.message == "Provided Category Id doesn't exist") {
      statusCode = 404
    } else {
      statusCode = 500
    }
    return res.status(statusCode).json({
      success: false,
      error: error.message,
    })
  }
}

async function saveNewCategory(req, res) {
  try {
    const name = req.body.name
    if (!name || name == '' || !isNaN(name)) {
      throw new Error('Invalid name provided for category!')
    }
    const newCategory = await categoriesServices.newCategory(name)
    return res.status(200).json({
      success: true,
      data: newCategory,
    })
  } catch (error) {
    let statusCode = 400

    if (error.message === 'Invalid Category Id provided!') {
      statusCode = 400
    } else {
      statusCode = 500
    }

    return res.status(statusCode).json({
      success: false,
      error: error.message,
    })
  }
}

async function updateCategoryData(req, res) {
  try {
    const id = req.query.id
    const name = req.body.name
    if (id <= 0 || isNaN(id)) {
      throw new Error('Invalid Category Id provided!')
    }
    if (!name || name == '' || !isNaN(name)) {
      throw new Error('Invalid name provided for category!')
    }
    const updatedCategory = await categoriesServices.updateCategory(id, name)
    return res.status(200).json({
      success: true,
      data: updatedCategory,
    })
  } catch (error) {
    let statusCode = 400

    if (error.message === 'Invalid Category Id provided!' || error.message === 'Invalid name provided for category!') {
      statusCode = 400
    } else {
      statusCode = 500
    }

    return res.status(statusCode).json({
      success: false,
      error: error.message,
    })
  }
}

async function deleteCategoryData(req, res) {
  try {
    const id = req.query.id
    if (id <= 0 || isNaN(id)) {
      throw new Error('Invalid Category Id provided!')
    }
    const deletedCategory = await categoriesServices.deleteCategory(id)
    return res.status(200).json({
      success: true,
      data: deletedCategory,
    })
  } catch (error) {
    let statusCode = 400

    if (error.message === 'Invalid Category Id provided!') {
      statusCode = 400
    } else if (error.message == "Provided Category Id doesn't exist") {
      statusCode = 404
    } else {
      statusCode = 500
    }

    return res.status(statusCode).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = { loadCategoriesData, saveNewCategory, updateCategoryData, deleteCategoryData }