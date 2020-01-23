var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var nicknames = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chatV2.html');
  });




io.on('connection', function(socket){

    socket.on('new user', function(data, callback){

      // check if nickname already exist 
      if (nicknames.indexOf(data) != -1) {
        // if nickname is in the array, send false
        callback(false);

        
      } else {
        callback(true);
        // add the nickname into socket 
        socket.nickname = data;
        //push it into the array
        nicknames.push(socket.nickname);

        io.sockets.emit('usernames', nicknames)
        
      }

    });
    
    socket.on('send message', function(data){ 
      
      io.emit('new message', {msg: data, nick: socket.nickname});
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});