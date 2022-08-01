const mqtt = require('mqtt');

//Broker config
const brokerConfig = {
    clientId: 'hieu-sub',
    username: 'landslide',
    password: 'oYPSNMspLlNXX5o8',
}
const client = mqtt.connect('mqtt://landslide.cloud.shiftr.io:1883', brokerConfig)
const topic = 'a';


client.on('message', async (topic, message) => {
    // let data = JSON.parse(message.toString())

    
    console.log(data);
})

client.on('connect', () => {
    console.log('from sub');
    client.subscribe(topic)
})