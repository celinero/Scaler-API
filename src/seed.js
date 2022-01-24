
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const { databaseConnector } = require('./database');
const { Category } = require('./database/schemas/CategorySchema')
const { Ticket, TicketMessage } = require('./database/schemas/TicketSchema')
const { User } = require('./database/schemas/UserSchema')


async function seedDB() {
  console.log('> Start seed');

  await databaseConnector();
  
  console.log('> User');
  await User.deleteMany();

  await Promise.all([
    {
      _id: 'W56a8PP0YlUnP9uaz0GMt33LxUi2', //123
      role: 'user', 
    },
    {
      _id: 'GpfQjdCFZoZX3SdMa665M38I0Gy1', //456
      role: 'user', 
    },
    {
      _id: 'Tr7IW48211Wqs7iK3d8ixn94UYv1', //789
      role: 'user', 
    },
    {
      _id: 'ugTcGS6tESTe4w0T8TwjXrE861z2', //admin
      role: 'admin', 
    }
  ].map(value => new User(value).save().then(entry => {
      console.log('.. Add user:', entry._id, entry.role)
    })
  ))

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
      ticketMessages: [
        new TicketMessage({
          ticketMessage:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
          ticketDate: 1641780774654
        }),
        new TicketMessage({
          ticketMessage:  'Wollolo, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
          ticketDate: 1641780794654
        })
      ],
      ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
      ticketSeen: false,
      ticketResolved: false
    },
    {
      ticketSubject: 'Modwheel on VSTi', 
      ticketCategoryID: bugfix,
      ticketMessages: [
        new TicketMessage({
          ticketMessage:  'Wollolo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
          ticketDate: 1641780774654
        }),
        new TicketMessage({
          ticketMessage:  'lorem ipsum, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
          ticketDate: 1641780794654
        })
      ],
      ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
      ticketSeen: true,
      ticketResolved: false
    },
    {
      ticketSubject: 'Modwheel on VSTi', 
      ticketCategoryID: general_feedback,
      ticketMessages: [
        new TicketMessage({
          ticketMessage:  'Wollolo ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ticketUserID: 'W56a8PP0YlUnP9uaz0GMt33LxUi2',
          ticketDate: 1641780774654
        }),
      ],
      ticketUserID: 'GpfQjdCFZoZX3SdMa665M38I0Gy1',
      ticketSeen: true,
      ticketResolved: false
    },

  ].map(value =>  new Ticket(value).save().then(entry => {
      console.log('.. Add ticket:', entry._id, entry.ticketSubject)
    })
  ))

  console.log('> End seed');
  process.exit()
}

seedDB();