// Setup .env variables
require('dotenv').config()

const express = require('express');
const { databaseConnector } = require('./database');

const app = express();

var cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';


databaseConnector()
  .then(() => {
    console.log('Database connected, yay!');
  }).catch(error => {
    console.log(`
      Some error occured connecting to the database. It was:
      ${error}
    `)
  })


const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
})



// receive JSON data from POST/PUT/PATCH/DELETE requests
app.use(express.json());

// same as above for form data
app.use(express.urlencoded({extended:true}));


app.get('/', (request, response) => {
  response.json({message:"Scaler Support App yayyyy!"});
});

const importedTicketRouting = require('./Tickets/ticketsRoutes');
app.use('/tickets', importedTicketRouting);

const importedUserRouting = require('./Users/userRoutes');
app.use('/users', importedUserRouting);

app.listen(PORT, HOST, () => {
  console.log("Server is running!");
});