var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio2 = $('#lblEscritorio3');
var lblEscritorio3 = $('#lblEscritorio4');

var lblTicket = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorio = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoAcutal', function(data) {
    /*    console.log(data); */
    actualizarHTML(data.ultimos4);
});


socket.on('ultimos4', function(data) {
    /* console.log(data); */
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos4);
});



function actualizarHTML(ultimos4) {



    for (var i = 0; i <= ultimos4.length - 1; i++) {

        /* console.log("tiene", ultimos4.length - 1);
        console.log(lblEscritorio[i]); */
        lblTicket[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorio[i].text('Escritorio ' + ultimos4[i].escritorio);

    }

}