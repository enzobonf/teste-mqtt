const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
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
});

client.on('message', (topic, message) => {
    console.log('\Topic:', topic, '\nMessage:', message.toString());
    console.log('----------------')
})