const { RSA_X931_PADDING } = require('constants');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = async () => {
    rl.question('Tópico para enviar: ', (topic) => rl.question('Mensagem: ', (msg)=>{
        client.publish(`${topic}/77`, msg);
        question();
    }));
}

client.on('connect', async ()=>{
    question();
});

/* client.on('message', (topic, message) => {
    console.log('\Topic:', topic, '\nMessage:', message.toString());
    console.log('----------------')
}) */