const { sqlConfig } = require("../db")
const sql = require('mssql')

async function showAllCategories(id) {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('categoryID', sql.Int, id)
    .execute('sp_GetCategories');

  const categories = result.recordsets[0];
  if (!categories.length) {
    throw new Error("Provided Category Id doesn't exist");
  }
  return categories;
}

async function newCategory(name) {
  const pool = await sql.connect(sqlConfig)
  if (!name || name == '' || name == null) {
    throw new Error('Invalid name provided for Category!')
  }
  const verifyExist = await pool.request().input('NameCategory', sql.VarChar, name).query('select name from categories where name = @NameCategory')

  if (verifyExist.recordsets[0].length > 0) {
    throw new Error('Provided name already exists!')
  }
  const result = await pool.request().input('Name', sql.VarChar, name).execute('sp_CreateCategory')
  return result.rowsAffected.length > 0 ? 'New Category Created Successfully!' : 'Error while try to create a new Category!'
}

async function updateCategory(id, name) {
  const verifyId = await showAllCategories(id)
  if (verifyId.length > 0) {
    const pool = await sql.connect(sqlConfig)
    if (!name || name == '' || name == null) {
      throw new Error('Invalid name provided for Category!')
    }
    const verifyExist = await pool.request().input('NameCategory', sql.VarChar, name).query('select name from categories where name = @NameCategory')
    if (verifyExist.recordsets[0].length > 0) {
      throw new Error('Provided name already exists!')
    }

    const result = await pool.request()
      .input('CategoryID', sql.Int, id)
      .input('Name', sql.VarChar, name)
      .execute('sp_UpdateCategory')
    return result.rowsAffected.length > 0 ? 'Category Updated Successfully!' : 'Error while try to update a Category!'
  }

  throw new Error("Category Id don't found!")
}

async function deleteCategory(id) {
  const verifyId = await showAllCategories(id)
  if (verifyId.length > 0) {
    const pool = await sql.connect(sqlConfig)
    const result = await pool.request()
      .input('CategoryID', sql.Int, id)
      .execute('sp_DeleteCategory');
    return result.rowsAffected.length > 0 ? 'Category Deleted Successfully!' : 'Error while try to delete a Category!'
  }
  throw new Error("Category Id don't found!")
}


module.exports = { showAllCategories, newCategory, updateCategory, deleteCategory }
