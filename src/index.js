// Setup .env variables
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const { databaseConnector } = require('./database');
const importedTicketRouting = require('./Tickets/ticketsRoutes');
const importedCategoryRouting = require('./Categories/categoriesRoutes');
const importedUserRouting = require('./Users/userRoutes');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(cors())

databaseConnector()
  .then(() => {
    console.log('Database connected, yay!');
  }).catch(error => {
    console.log(`
      Some error occured connecting to the database. It was:
      ${error}
    `)
  })

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
})

// receive JSON data from POST/PUT/PATCH/DELETE requests
app.use(express.json());

// same as above for form data
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => {
  response.json({message:"Scaler Support App yayyyy!"});
});

app.use('/tickets', importedTicketRouting);

app.use('/categories', importedCategoryRouting);

app.use('/users', importedUserRouting);

app.listen(PORT, HOST, () => {
  console.log("Server is running!");
});