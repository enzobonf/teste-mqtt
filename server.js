var mosca = require('mosca');

/* var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
}; */

let settings = {
  port: 1883,
  //backend: ascoltatore
};

let topicos = [
  'temperatura',
  'umidade',
  'peso',
  'temp_externa',
  'umid_externa',
]

var server = new mosca.Server(settings);

server.on('clientConnected', (client) => {
    console.log('client connected', client.id);
});

server.on('clientDisconnected', (client)=>{
  console.log('client disconnected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  const topic = packet.topic.split('/')[0];
  if(topicos.includes(topic)){
    const number = packet.topic.split('/')[1];
    server.publish({
      payload: JSON.stringify({leitura: packet.payload.toString(), topic, number}),
      qos: 0,
      retain: false,
      topic: 'all'
    }, ()=>{
      console.log('Published', packet.payload);
    });
  }
});

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running');
}