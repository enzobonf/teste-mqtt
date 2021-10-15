const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

client.on('connect', ()=>{
    client.subscribe('test', (err)=>{
        if(!err){
            client.publish('test', 'Hello');
        }
    })

});

client.on('message', (topic, message) => {
    console.log('\Topic:', topic, '\nMessage:', message.toString());
    console.log('----------------')
})