// require the library
const mongoose = require('mongoose');

// creating Scema for Tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

// exporting the database
module.exports = Task;