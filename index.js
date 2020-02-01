var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var nicknames = [];

app.set('views engine', 'twig');

app.get('/', function(req, res){
    res.render('index.html.twig');
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

        // send the array to client
        io.sockets.emit('usernames', nicknames);
        
      }

    });
    
    socket.on('send message', function(data){ 
      
      io.emit('new message', {msg: data, nick: socket.nickname});
    });

    function updateNicknames(){

      

    };
    socket.on('disconnect', function(data){

      // send name of disconnected user to client
      io.emit('userOff', socket.nickname);
      
      // if the user never joined the room
      if(!socket.nickname) return;

      // if the user left the room, remove the nickname from the array
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
      
    })
  });

    

http.listen(3000, function(){
  console.log('listening on *:3000');
});