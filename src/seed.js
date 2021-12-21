
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const { databaseConnector } = require('./database');
const { Category } = require('./database/schemas/CategorySchema')
const { Ticket } = require('./database/schemas/TicketSchema')


async function seedDB() {
  console.log('> Start seed');

  await databaseConnector();

  console.log('> Category');
  await Category.deleteMany();
  console.log('.. Remove all categories')

  const feature_request = new ObjectId();
  const bugfix = new ObjectId();
  const tutorial = new ObjectId();
  const general_feedback = new ObjectId();

  await Promise.all([
    {
      _id: feature_request,
      name: 'Feature request', 
    },
    {
      _id: bugfix,
      name: 'Report a bug', 
    },
    {
      _id: tutorial,
      name: 'Tutorial', 
    },
    {
      _id: general_feedback,
      name: 'General Feedback', 
    }

  ].map(value => new Category(value).save().then(entry => {
      console.log('.. Add category:', entry._id, entry.name)
    })
  ))

  console.log('> Ticket');
  await Ticket.deleteMany();
  console.log('.. Remove all tickets')

  await Promise.all([
    {
      ticketSubject: 'Arpeggio', 
      ticketCategoryID: feature_request,
      ticketMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ticketUserID: '12345'
    },
    {
      ticketSubject: 'Modwheel on VSTi', 
      ticketCategoryID: bugfix,
      ticketMessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ticketUserID: '67890'
    },
    {
      ticketSubject: 'Jethro Tull music ', 
      ticketCategoryID: tutorial,
      ticketMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ticketUserID: '54321'
    },
    {
      ticketSubject: 'Modwheel on VSTi', 
      ticketCategoryID: general_feedback,
      ticketMessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ticketUserID: '09876'
    },

  ].map(value =>  new Ticket(value).save().then(entry => {
      console.log('.. Add ticket:', entry._id, entry.ticketMessage)
    })
  ))

  console.log('> End seed');
  process.exit()
}

seedDB();