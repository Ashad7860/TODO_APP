// Required express for setting up the express server
const express = require('express');

// importing the database
const db = require('./config/mongoose');

// importing the Schema for tasks
const todos_data = require('./models/todos_data');

// using express
const app = express();

// Set up the port number
const port = 8000;

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// to use encrypted data
app.use(express.urlencoded());

// using static files
app.use(express.static('assets'));

// Rendering the App Page
app.get('/', function(req, res) {
    todos_data.find({}, function(err, task) {
        if (err) {
            console.log('Erorr in fetching tasks from db');
            return;
        }

        return res.render('homee', {
            title: "Home",
            task: task
        });
    })
});
app.get('/form', function(req, res) {
    todos_data.find({}, function(err, task) {
        if (err) {
            console.log('Erorr in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home",
            task: task
        });
    })
});

// Create Tasks
app.post('/create-task', function(req, res) {
    // console.log("Creating Task");

    todos_data.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTask) {
        if (err) {
            console.log('error in creating task', err);
            return;
        }

        // console.log(newtask);
        return res.redirect('back');
    });
});

// deleting Tasks
app.get('/delete-task', function(req, res) {
    // Get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {

        // finding and deleting from the DB one using id
        todos_data.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log('Error in deleting task');
            }
        })
    }
    return res.redirect('back');
});

// Make  the app to listen on asigned port number
app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server:", err);
    }

    console.log("Server is up and running on port:", port);
});