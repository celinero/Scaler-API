const {Ticket} = require('../database/schemas/TicketSchema');

// get all posts 
async function getAllTickets(){
    let allTickets = await Ticket.find();
    return JSON.stringify(allTickets);
}

// create a ticket 
async function createSpecificTicket(ticketDetails){
  console.log(`Received ticketdetails of ${JSON.stringify(ticketDetails)}`);
  let newTicket = new Ticket({
    ticketSubject: ticketDetails.ticketSubject,
    ticketCategoryID: ticketDetails.ticketCategoryID,
    ticketMessage: ticketDetails.ticketMessage,
    ticketUserID: ticketDetails.ticketUserID,
    
  });

  let creationResult = await newTicket.save();
  return creationResult;
}


async function getAllTicketsByUserID(userID){
  let queryResult = await Ticket.find({ticketUserID:userID})
  return queryResult;
}

module.exports = {
   getAllTickets, createSpecificTicket, getAllTicketsByUserID
}