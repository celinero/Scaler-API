const express = require('express');
const { Category } = require('../database/schemas/CategorySchema');
const routes = express.Router();

routes.get('/', async (request, response) => {
  const categories = await Category.find();
  response.json(categories);
});

routes.get('/:categoryId', async (request, response) => {
  const category = await Category.findById(request.params.categoryId).exec();
  response.json(category)
});

module.exports = routes;