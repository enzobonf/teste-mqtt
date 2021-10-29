const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

client.on('connect', ()=>{
    
    setInterval(() => {
        client.publish(`temperatura/${getRandomInt(1,4)}`, getRandom(30, 50).toFixed(1).toString());
        client.publish(`umidade/${getRandomInt(1,4)}`, getRandom(75, 100).toFixed(1).toString());
        client.publish(`peso/${getRandomInt(1,4)}`, getRandomInt(2500, 3000).toFixed(1).toString());
    }, 1500);

});

client.on('packetsend', (packet) => {
    console.log(`Leitura enviada -> tópico: ${packet.topic} - leitura: ${packet.payload}`);
    console.log('----------------')
})

