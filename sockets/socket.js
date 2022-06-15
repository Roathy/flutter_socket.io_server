const {io} = require('../index');

//Sockets messages
io.on('connection', client => { //client=dispositivo que se conectó al server
  console.log('cliente conectado');
  //client.on('event', data => {});
  client.on('disconnect', () => {
    console.log('cliente desconectado');
  });

  client.on('clientMessage', (payload) => {
    console.log('got one message: ', payload.name)
  });

  io.emit('serverMessage', { message: 'all clients listen!' });
});