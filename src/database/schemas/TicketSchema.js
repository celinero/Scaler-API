const mongoose = require("mongoose");

const TicketMessageSchema = new mongoose.Schema({
  ticketMessage: String,
  ticketUserID: String,
  ticketDate: Number,
});

const TicketMessage = mongoose.model("TicketMessage", TicketMessageSchema);

const TicketSchema = new mongoose.Schema({
  ticketSubject: String,
  ticketCategoryID: String,
  ticketMessages: [TicketMessageSchema],
  ticketUserID: String,
  ticketSeen: Boolean,
  ticketResolved: Boolean,
  ticketDate: Number,
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = { Ticket, TicketMessage };
