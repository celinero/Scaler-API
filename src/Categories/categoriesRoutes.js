const express = require('express');
const { getAllCategories, getSpecificCategory } = require('./categoriesFunctions');
const routes = express.Router();

routes.get('/', async (request, response) => {
  const categories = await getAllCategories();
  response.json(categories);
});

routes.get('/:categoryId', async (request, response) => {
  const category = await getSpecificCategory(request.params.categoryId);
  response.json(category)
});

module.exports = routes;