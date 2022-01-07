// require the library
// const { Console } = require('console');
const mongoose = require('mongoose');

// connect to the datbase
mongoose.connect('mongodb://localhost/todos_list');

// aquire the connection (to check if it is successful)
const db = mongoose.connection;

// if Error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

// up and running then print the message
db.once('open', function() {
    console.log('Connected to Database');
});