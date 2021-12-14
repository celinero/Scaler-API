const express = require('express');
const { getAllTickets, createSpecificTicket, getAllTicketsByUserID } = require('./ticketsFunctions');
const routes = express.Router();

// get all tickets
routes.get('/', async (request, response) => {
// routes.get('/:username/status/:postID', (request, response) => {...})
  
let allTickets = await getAllTickets();
  response.json(allTickets);

  // response.json(`Received a request on ${request.originalUrl}`);

});

// create a new ticket 
routes.post('/', async (request, response) => {
  //let tempTicketDetails = {}
  //let creationResult = await createSpecificTicket(tempTicketDetails)
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

routes.get('/:userID', async (request, response) => {
  let allUserTickets = await getAllTicketsByUserID(request.params.userID);

  response.json(allUserTickets);

})






// route parameter
routes.get('/:ticketID', (request, response) => {
  response.json(`Route param was ${request.params.ticketID}`)
});

module.exports = routes;