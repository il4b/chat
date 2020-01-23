$(function () {
    var socket = io();
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading
        let message = {
            author: '',
            texte: '',
            image: '',
            date: Date()
        }
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
    
    var liElt =  $('#liElt').clone().$('#pElt').text(text(msg));

    
    $('#messages').append(liElt);
    });
});