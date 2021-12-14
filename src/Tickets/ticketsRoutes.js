const express = require('express');

const routes = express.Router();

// get all tickets
routes.get('/', (request, response) => {
// routes.get('/:username/status/:postID', (request, response) => {...})
  
// let allPosts = await getAllPosts();
  // response.json(allPosts);

  response.json(`Received a request on ${request.originalUrl}`);

});

// create a new ticket 
routes.post('/:ticketID', (request, response) => {
  let submittedData = request.body;
  console.log(JSON.stringify(submittedData));

  response.json(`received name of ${request.body.name} and nails of ${request.body.nails}`)
});

// route parameter
routes.get('/:ticketID', (request, response) => {
  response.json(`Route param was ${request.params.ticketID}`)
});

module.exports = routes;