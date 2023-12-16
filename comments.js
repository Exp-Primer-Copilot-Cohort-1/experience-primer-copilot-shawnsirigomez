//Create web server
var express = require('express');
var app = express();

//Create server
var server = require('http').createServer(app);
//Create socket
var io = require('socket.io')(server);
//Create file system
var fs = require('fs');

//Listen on port 3000
server.listen(3000);

//Array to store comments
var comments = [];

//Read comments from file
fs.readFile('comments.txt', function(err, data) {
  if(err) throw err;
  comments = JSON.parse(data);
});

//When socket connection is established
io.on('connection', function(socket) {
  console.log('A user connected');
  //When user disconnects
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
  //When a user adds a comment
  socket.on('addComment', function(comment) {
    comments.push(comment);
    //Write comments to file
    fs.writeFile('comments.txt', JSON.stringify(comments), function(err) {
      if(err) throw err;
      console.log('Comment saved');
    });
    //Send updated comments to all users
    io.emit('updateComments', comments);
  });
});

//Send comments to client
app.get('/comments', function(req, res) {
  res.send(comments);
});