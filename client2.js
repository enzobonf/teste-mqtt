const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.0.128:1883');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = () => {
    rl.question('Mensagem a enviar: ', (msg)=>{
        client.publish('test', msg);
        question();
    });
}

client.on('connect', async ()=>{
    question();
    client.subscribe('test');
});

client.on('message', (topic, message) => {
    console.log('\Topic:', topic, '\nMessage:', message.toString());
    console.log('----------------')
})