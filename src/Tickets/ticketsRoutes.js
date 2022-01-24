const express = require('express');
const { 
  getAllTickets,
  getSpecificTicket,
  getAllTicketsByUserID,
  createSpecificTicket,
  updateSpecificTicket,
  deleteSpecificTicket,
  addMessageToTicket
} = require('./ticketsFunctions');
const { validateUserFromHeader} = require('../Users/userFunctions');
const routes = express.Router();

// get all tickets
routes.get('/', async (request, response) => {
  const { uid } = await validateUserFromHeader(request)
  
  //  if user is isAdmin
  // let allTickets = await getAllTickets();
  // response.json(allTickets);
  
  // else
  let allUserTickets = await getAllTicketsByUserID(uid);
  response.json(allUserTickets);
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


routes.post('/:ticketID/message', async (request, response) => {
  const result = await addMessageToTicket(request.params.ticketID, request.body);
  response.json(result);
});


// update specific ticket
routes.put('/:ticketID', async (request, response) => {
  let updateResult = await updateSpecificTicket({
      ticketID: request.params.ticketID,
      ticketSubject: request.body.ticketSubject,
      ticketCategoryID: request.body.ticketCategoryID,
      ticketMessage: request.body.ticketMessage,
      ticketUserID: request.body.ticketUserID,
      ticketSeen: request.body.ticketSeen,
      ticketResolved: request.body.ticketResolved
  })
  response.json(updateResult);
});

// delete specific ticket
routes.delete('/:ticketID', async (request, response) => {
  let deleteResult = deleteSpecificTicket(request.params.ticketID);
  response.json(deleteResult);
});

module.exports = routes;