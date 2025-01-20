const  grpc = require('@grpc/grpc-js');  
const  protoLoader = require('@grpc/proto-loader');  


const PROTO_PATH =  'src/protos/greet.proto';

const PORT = 7741|process.env.PORT;

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const greet_proto = grpc.loadPackageDefinition(packageDefinition).Greeter;
 
if (!greet_proto ) {
  console.error("Erro ao carregar o serviço Greeter cod1.");
  process.exit(1); 
}
 
const server = new grpc.Server();
server.addService(greet_proto.service, {
  SayHello: (call, callback) => {
    callback(null, { message: 'Hello ' + call.request.name });
  },
});


console.log('Iniciando servidor em http://localhost:'+PORT);

const bindResult = server.bindAsync('localhost:'+PORT, grpc.ServerCredentials.createInsecure(),(error,port)=>{
  if(error)
  {
    console.error("Erro ao iniciar o servidor.",error);
    proccess.exit(1);
  }
  console.log('Server running at http://localhost:' + port);
});
 

setInterval(() => {console.log("server alive");},60000);