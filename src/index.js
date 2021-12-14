// Setup .env variables
require('dotenv').config()

const express = require('express')

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// receive JSON data from POST/PUT/PATCH/DELETE requests
app.use(express.json());

// same as above for form data
app.use(express.urlencoded({extended:true}));


app.get('/', (request, response) => {
  response.json({message:"Scaler Support App yayyyy!"});
});

const importedTicketRouting = require('./Tickets/ticketsRoutes');
app.use('/tickets', importedTicketRouting);

app.listen(PORT, HOST, () => {
  console.log("Server is running!");
});