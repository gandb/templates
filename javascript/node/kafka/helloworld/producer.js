 const { Kafka, Partitioners } = require('kafkajs');


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
    //brokers: ['192.168.1.192:9992'],
    //brokers: ['192.168.56.1:9992'],
    logLevel: 5, // Definir para o nível mais alto de log
    ssl:false
  });

   
  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  
  const run = async () => {
    console.log('Se preparando para conectar ao kafka...');
    await producer.connect();
    console.log('Conectado ao Kafka!');
    await producer.send({
      topic: 'topic',
      messages: [
        { value: 'Mensagem de teste' }
      ]
    });
    console.log('Mensagem enviada!');
    await producer.disconnect();
  }
  
  run().catch(console.error);
  