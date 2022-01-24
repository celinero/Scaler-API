const express = require('express');
const { Ticket, TicketMessage, } = require('../database/schemas/TicketSchema');
const { validateRequest } = require('../Users/userFunctions');
const routes = express.Router();

// Get all tickets
routes.get('/', validateRequest(async (request, response, { uid, role }) => {
  const tickets = role === 'admin' ? await Ticket.find() : await Ticket.find({ ticketUserID: uid });

  response.json(tickets);
}));

// Get specific ticket
routes.get('/:ticketID', validateRequest(async (request, response, { uid, role }) => {
  const ticket = await Ticket.findById(request.params.ticketID).exec();

  if (ticket.ticketUserID !== uid && role !== 'admin') {
    response.status(401).end();
    return;
  }

  response.json(ticket);
}));

// Get all tickets by user
routes.get('/:userID', validateRequest(async (request, response, { uid, role }) => {
  if (request.params.userID !== uid && role !== 'admin') {
    response.status(401).end();
    return;
  }

  const tickets = await Ticket.find({ ticketUserID:request.params.userID })
  response.json(tickets);
}))

// Create a new ticket 
routes.post('/', validateRequest(async (request, response, { uid }) => {
  const ticket = new Ticket({
    ticketSubject: request.body.ticketSubject,
    ticketCategoryID: request.body.ticketCategoryID,
    ticketMessages: [
      new TicketMessage({
        ticketMessage: request.body.ticketMessage,
        ticketUserID: uid,
        ticketDate: new Date().getTime()
      })
    ],
    ticketUserID: uid,
    ticketSeen: true,
    ticketResolved: false
  });

  const result = await ticket.save();

  response.json(result);
}));

// Add a message to a ticket
routes.post('/:ticketID/message', validateRequest(async (request, response, { uid, role }) => {
  const ticket = await Ticket.findById(request.params.ticketID)

  if (ticket.ticketUserID !== uid && role !== 'admin') {
    response.status(401).end();
    return;
  }

  ticket.ticketMessages = [
    ...ticket.ticketMessages,
    new TicketMessage({
      ticketMessage: request.body.ticketMessage,
      ticketUserID: uid,
      ticketDate: new Date().getTime()
    })
  ]

  ticket.save();

  response.json(ticket);
}));

// Update specific ticket
routes.put('/:ticketID', validateRequest(async (request, response, { uid, role }) => {
  const ticket = await Ticket.findById({ _id: request.params.ticketID });

  if (ticket.ticketUserID !== uid && role !== 'admin') {
    response.status(401).end();
    return;
  }

  const result = await Ticket.findByIdAndUpdate(
    { 
      _id: request.params.ticketID
    },
    {
      ticketSubject: request.body.ticketSubject,
      ticketCategoryID: request.body.ticketCategoryID,
      ticketMessages: request.body.ticketMessages,
      ticketUserID: request.body.ticketUserID,
      ticketSeen: request.body.ticketSeen,
      ticketResolved: request.body.ticketResolved
    },
    { 
      upsert: true, // upsert means it'll create document if it doesn't exist
      new: true // return the new modified doc. if false, original is returned.
    } 
  );

  response.json(result);
}));

// Delete specific ticket
routes.delete('/:ticketID', validateRequest(async (request, response, { uid, role }) => {
  const ticket = await Ticket.findById({ _id: request.params.ticketID });

  if (ticket.ticketUserID !== uid && role !== 'admin') {
    response.status(401).end();
    return;
  }

  const result = await Ticket.deleteOne({ _id: request.params.ticketID });
  response.json(result);
}));

module.exports = routes;