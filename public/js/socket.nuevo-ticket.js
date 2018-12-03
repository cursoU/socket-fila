//Comando para establece la comunicacion

var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});


socket.on('estadoAcutal', function(estadoAcutalTicket) {
    label.text(estadoAcutalTicket.actual);
});

$('button').on('click', function() {
    //Enviar Informacion
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});