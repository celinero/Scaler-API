const { Category } = require("./database/schemas/CategorySchema");

const addCategoryToTicket = async ({ ticket }) => {
  const categories = await Category.find();
  const duplicatedTicket = JSON.parse(JSON.stringify(ticket));

  return {
    ...duplicatedTicket,
    ticketCategoryName: categories.find(
      (category) => category._id.toString() === ticket.ticketCategoryID
    ).name,
  };
};

const addCategoriesToTickets = async ({ tickets }) => {
  const categories = await Category.find();
  const duplicatedTickets = JSON.parse(JSON.stringify(tickets));

  return duplicatedTickets.map((ticket) => ({
    ...ticket,
    ticketCategoryName: categories.find(
      (category) => category._id.toString() === ticket.ticketCategoryID
    ).name,
  }));
};

module.exports = { addCategoryToTicket, addCategoriesToTickets };
