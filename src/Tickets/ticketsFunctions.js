const {Ticket} = require('../database/schemas/TicketSchema');

// get all tickets 
async function getAllTickets(){
    let allTickets = await Ticket.find();
    return JSON.stringify(allTickets);
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
    ticketMessage: ticketDetails.ticketMessage,
    ticketUserID: ticketDetails.ticketUserID
  });

  let creationResult = await newTicket.save();
  return creationResult;
}


// Update a ticket
async function updateSpecificTicket(ticketDetails){
  let updateResult = await Ticket.findByIdAndUpdate(
      {_id: ticketDetails.ticketID},
      {
        ticketSubject: ticketDetails.ticketSubject,
        ticketCategoryID: ticketDetails.ticketCategoryID,
        ticketMessage: ticketDetails.ticketMessage,
        ticketUserID: ticketDetails.ticketUserID
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
   getAllTickets, getSpecificTicket, getAllTicketsByUserID, createSpecificTicket, updateSpecificTicket, deleteSpecificTicket 
}