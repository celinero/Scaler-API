const express = require('express');
const { getAllTickets, getSpecificTicket, getAllTicketsByUserID, createSpecificTicket, updateSpecificTicket, deleteSpecificTicket } = require('./ticketsFunctions');
const routes = express.Router();

// get all tickets
routes.get('/', async (request, response) => {
  let allTickets = await getAllTickets();
  response.json(allTickets);
});


// get specific ticket
routes.get('/:ticketID', async (request, response) => {
  let queryResult = await getSpecificTicket(request.params.ticketID);
  response.json(queryResult)
});


// get all tickets by user
routes.get('/:userID', async (request, response) => {
  let allUserTickets = await getAllTicketsByUserID(request.params.userID);
  response.json(allUserTickets);
})


// create a new ticket 
routes.post('/', async (request, response) => {
  let creationResult = await createSpecificTicket(
      {
          ticketSubject: request.body.ticketSubject,
          ticketCategoryID: request.body.ticketCategoryID,
          ticketMessage: request.body.ticketMessage,
          ticketUserID: request.body.ticketUserID
      }
  );
  response.json(creationResult);
});


// update specific ticket
routes.put('/:ticketID', async (request, response) => {
  let updateResult = await updateSpecificTicket({
      ticketID: request.params.ticketID,
      ticketSubject: request.body.ticketSubject,
      ticketCategoryID: request.body.ticketCategoryID,
      ticketMessage: request.body.ticketMessage,
      ticketUserID: request.body.ticketUserID
  })
  response.json(updateResult);
});

// delete specific ticket
routes.delete('/:ticketID', async (request, response) => {
  let deleteResult = deleteSpecificTicket(request.params.ticketID);
  response.json(deleteResult);
});



// route parameter
routes.get('/:ticketID', (request, response) => {
  response.json(`Route param was ${request.params.ticketID}`)
});

module.exports = routes;