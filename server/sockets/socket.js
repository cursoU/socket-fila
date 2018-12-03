const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    /*  console.log('Usuario conectado'); */

    client.emit('siguienteTicket', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);

        callback(siguiente);
    });

    //emitir estado 'estadoAcutal'

    client.emit('estadoAcutal', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4Ticket()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        console.log(data.escritorio);
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar /notificar cambios en los ultimos 4

    });

    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimo4Ticket()
    });

});