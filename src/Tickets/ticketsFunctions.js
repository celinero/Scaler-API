const { Ticket, TicketMessage, } = require('../database/schemas/TicketSchema');

// get all tickets 
async function getAllTickets(){
  let allTickets = await Ticket.find();
  return allTickets
}


// get specific ticket
async function getSpecificTicket(ticketID){
  let specificTicketQuery = await Ticket.findById(ticketID).exec();
  return specificTicketQuery;
}

// get all tickets by user
async function getAllTicketsByUserID(userID){
  let queryResult = await Ticket.find({ticketUserID:userID})
  return queryResult;
}


// create a ticket 
async function createSpecificTicket(ticketDetails){
  console.log(`Received ticketdetails of ${JSON.stringify(ticketDetails)}`);
  let newTicket = new Ticket({
    ticketSubject: ticketDetails.ticketSubject,
    ticketCategoryID: ticketDetails.ticketCategoryID,
    ticketMessages: [
      new TicketMessage({
        ticketMessage: ticketDetails.ticketMessage,
        ticketUserID: ticketDetails.ticketUserID,
        ticketDate: new Date().getTime()
      })
    ],
    ticketUserID: ticketDetails.ticketUserID,
    ticketSeen: true,
    ticketResolved: false
  });

  let creationResult = await newTicket.save();
  return creationResult;
}

// Add a message to a ticket
async function addMessageToTicket(ticketID, ticketDetails){

  const currentTicket = await Ticket.findById(ticketID)

  currentTicket.ticketMessages = [
    ...currentTicket.ticketMessages,
    new TicketMessage({
      ticketMessage: ticketDetails.ticketMessage,
      ticketUserID: ticketDetails.ticketUserID,
      ticketDate: new Date().getTime()
    })
  ]

  currentTicket.save();

  return currentTicket;
}


// Update a ticket
async function updateSpecificTicket(ticketDetails){
  let updateResult = await Ticket.findByIdAndUpdate(
      {_id: ticketDetails.ticketID},
      {
        ticketSubject: ticketDetails.ticketSubject,
        ticketCategoryID: ticketDetails.ticketCategoryID,
        ticketMessages: ticketDetails.ticketMessages,
        ticketUserID: ticketDetails.ticketUserID,
        ticketSeen: ticketDetails.ticketSeen,
        ticketResolved: ticketDetails.ticketResolved
      },
      { 
          upsert: true, // upsert means it'll create document if it doesn't exist
          new: true // return the new modified doc. if false, original is returned.
      } 
  );

  return updateResult;
}


// Delete a ticket
async function deleteSpecificTicket(ticketID){
  let deletionResult = await Ticket.deleteOne({ _id: ticketID});
  return deletionResult;
}



module.exports = {
   getAllTickets,
   getSpecificTicket,
   getAllTicketsByUserID,
   createSpecificTicket,
   updateSpecificTicket,
   deleteSpecificTicket,
   addMessageToTicket 
}