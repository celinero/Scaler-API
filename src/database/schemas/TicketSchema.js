const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticketSubject: String, 
    ticketCategoryID: String,
    ticketMessage: String,
    ticketUserID: String
});

// If this happens after mongoose.model, methods won't have this
TicketSchema.methods.getUserName = async function getUserName(){
    console.log('Combine with Firebase Admin to find a user by ID and return their displayname');
}

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = {Ticket}