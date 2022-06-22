const { io } = require('../index');

const Bands = require('../models/bands_model');
const Band = require('../models/band_model');

const bands = new Bands();

bands.addBand(new Band('falling in reverse'));
bands.addBand(new Band('blind guardian'));
bands.addBand(new Band('ayreon'));
bands.addBand(new Band('system of a down'));
bands.addBand(new Band('bring me the horizon'));

//Sockets messages
io.on('connection', client => { //client=dispositivo que se conectó al server
  console.log('cliente conectado');

  client.on('disconnect', () => {
    console.log('cliente desconectado');
  });

  client.on('clientMessage', (payload) => {
    console.log('got one message: ', payload.name);
  });

  client.on('new-message', (payload) => {
    client.broadcast.emit('new-message', payload);
  });

  client.emit('current-bands', bands.getBands());

  client.on('add-new-band', (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit('current-bands', bands.getBands());
  });

  client.on('delete-band', (payload) => {
    bands.deleteBand(payload.id);
    io.emit('current-bands', bands.getBands());
  });

  client.on('vote-for-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('current-bands', bands.getBands());
  });
});