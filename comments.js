//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create a connection to the database
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/comments', function(req, res){
    var comment = req.body.comment;
    var user = req.body.user;
    var date = req.body.date;

    var sql = "INSERT INTO comments (comment, user, date) VALUES ('" + comment + "','" + user + "','" + date + "')";
    connection.query(sql, function(error, result){
        if(!!error){
            console.log('Error in the query');
        }else{
            console.log('Comment added');
            res.send('Comment added');
        }
    });
});

app.get('/comments', function(req, res){
    connection.query("SELECT * FROM comments", function(error, rows, fields){
        if(!!error){
            console.log('Error in the query');
        }else{
            console.log('Successful query');
            res.json(rows);
        }
    });
});

app.listen(3000);
console.log('Server started on port 3000');
