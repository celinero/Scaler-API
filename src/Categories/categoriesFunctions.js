const { Category } = require('../database/schemas/CategorySchema');

async function getAllCategories(){
  return await Category.find();
}

async function getSpecificCategory(categoryId){
  return await Category.findById(categoryId).exec();
}

module.exports = {
  getAllCategories, getSpecificCategory
}