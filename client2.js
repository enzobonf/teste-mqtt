const { RSA_X931_PADDING } = require('constants');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let topicos = [
    'temperatura',
    'umidade',
    'peso',
    'temp_externa',
    'umid_externa'
];

generateStrTopicos = () => {
    let str = '';
    topicos.forEach((topico, index)=>{
        str += `${topico} - ${index+1}\n`;
    });
    return str;
}

const question = async () => {
    rl.question('Número da sonda: ', (number) => rl.question(`Tópico para enviar: `, (topic) => rl.question('Mensagem: ', (msg)=>{
        client.publish(`${topicos[topic-1]}/${number}`, msg);
        question();
    })));
}

client.on('connect', async ()=>{
    console.log(`-----TÓPICOS----\n\n${generateStrTopicos()}----------------\n\n`);
    question();
});

/* client.on('message', (topic, message) => {
    console.log('\Topic:', topic, '\nMessage:', message.toString());
    console.log('----------------')
}) */