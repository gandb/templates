const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader'); 

const PROTO_PATH = __dirname + '/src/protos/greet.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const Greeter = grpc.loadPackageDefinition(packageDefinition).Greeter;

const greeter = new Greeter('localhost:7741', grpc.credentials.createInsecure());

greeter.SayHello({ name: ' motto' }, (err, response) => {
    if(err)
    {
        console.error("Error on service2:",err);
        return;
    }
  console.log('Greeting:', response); 
});