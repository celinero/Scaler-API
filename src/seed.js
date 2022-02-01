const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const { databaseConnector } = require("./database");
const { Category } = require("./database/schemas/CategorySchema");
const { Ticket, TicketMessage } = require("./database/schemas/TicketSchema");
const { User } = require("./database/schemas/UserSchema");

async function seedDB() {
  console.log("> Start seed");

  await databaseConnector();

  console.log("> User");
  await User.deleteMany();

  await Promise.all(
    [
      {
        _id: "AdaAUk8FmvVKkV6qk6Cclwm21wq2", //123
        displayName: "Celine123",
        role: "user",
      },
      {
        _id: "nlRIS3IQuWf0cVOHEHhdw0f5dbs2", //456
        displayName: "Celine456",
        role: "user",
      },
      {
        _id: "nNZqycKFgNbzX949PNlaKZDduEi2", //admin
        displayName: "CelineAdmin",
        role: "admin",
      },
    ].map((value) =>
      new User(value).save().then((entry) => {
        console.log(".. Add user:", entry._id, entry.role);
      })
    )
  );

  console.log("> Category");
  await Category.deleteMany();
  console.log(".. Remove all categories");

  const feature_request = new ObjectId();
  const bugfix = new ObjectId();
  const tutorial = new ObjectId();
  const general_feedback = new ObjectId();

  await Promise.all(
    [
      {
        _id: feature_request,
        name: "Feature request",
      },
      {
        _id: bugfix,
        name: "Report a bug",
      },
      {
        _id: tutorial,
        name: "Tutorial",
      },
      {
        _id: general_feedback,
        name: "General Feedback",
      },
    ].map((value) =>
      new Category(value).save().then((entry) => {
        console.log(".. Add category:", entry._id, entry.name);
      })
    )
  );

  console.log("> Ticket");
  await Ticket.deleteMany();
  console.log(".. Remove all tickets");

  await Promise.all(
    [
      {
        ticketSubject: "Arpeggio",
        ticketCategoryID: feature_request,
        ticketMessages: [
          new TicketMessage({
            ticketMessage:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
            ticketDate: 1641780774654,
          }),
          new TicketMessage({
            ticketMessage:
              "Wollolo, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
            ticketDate: 1641780794654,
          }),
          new TicketMessage({
            ticketMessage:
              "Wollolo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            ticketUserID: "nNZqycKFgNbzX949PNlaKZDduEi2",
            ticketDate: 1641780799654,
          }),
        ],
        ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
        ticketSeen: false,
        ticketResolved: false,
      },
      {
        ticketSubject: "Modwheel on VSTi",
        ticketCategoryID: bugfix,
        ticketMessages: [
          new TicketMessage({
            ticketMessage:
              "Wollolo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
            ticketDate: 1641780774654,
          }),
          new TicketMessage({
            ticketMessage:
              "lorem ipsum, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
            ticketDate: 1641780794654,
          }),
        ],
        ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
        ticketSeen: true,
        ticketResolved: false,
      },
      {
        ticketSubject: "Modwheel on VSTi",
        ticketCategoryID: general_feedback,
        ticketMessages: [
          new TicketMessage({
            ticketMessage:
              "Wollolo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
            ticketDate: 1641780774654,
          }),
        ],
        ticketUserID: "AdaAUk8FmvVKkV6qk6Cclwm21wq2",
        ticketSeen: true,
        ticketResolved: true,
      },
    ].map((value) =>
      new Ticket(value).save().then((entry) => {
        console.log(".. Add ticket:", entry._id, entry.ticketSubject);
      })
    )
  );

  console.log("> End seed");
  process.exit();
}

seedDB();
