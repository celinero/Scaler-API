const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/scaler'

async function databaseConnector() {
    await mongoose.connect(DATABASE_URI);
}

module.exports = {
    databaseConnector
}