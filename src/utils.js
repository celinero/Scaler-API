const { Category } = require("./database/schemas/CategorySchema");
const { User } = require("./database/schemas/UserSchema");

const findUser = (ticket, users) =>
  users.find((user) => user._id === ticket.ticketUserID);

const findCategory = (ticket, categories) =>
  categories.find(
    (category) => category._id.toString() === ticket.ticketCategoryID
  );

const enhanceTickets = async (tickets) => {
  const [categories, users] = await Promise.all([Category.find(), User.find()]);
  const newTickets = JSON.parse(JSON.stringify(tickets));

  return newTickets.map((ticket) => ({
    ...ticket,
    ticketCategoryName: findCategory(ticket, categories).name,
    ticketUserDisplayname: findUser(ticket, users).displayName,
    ticketUserRole: findUser(ticket, users).role,
    ticketMessages: ticket.ticketMessages.map((message) => ({
      ...message,
      ticketUserDisplayname: findUser(message, users).displayName,
      ticketUserRole: findUser(message, users).role,
    })),
  }));
};

module.exports = { enhanceTickets };
