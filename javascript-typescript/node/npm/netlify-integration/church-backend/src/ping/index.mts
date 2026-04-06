/*eg: http://localhost:8888/.netlify/functions/ping:teste
 eg de request:
curl -X POST "http://localhost:8888/.netlify/functions/ping/teste?idade=35" \
  -H "Content-Type: application/json" \
  -d '{"id": 35}'
eg prod:
curl -X POST "https://churchbackend.netlify.app/.netlify/functions/ping/teste?idade=33" \
  -H "Content-Type: application/json" \
  -d '{"id": 35}'

  Answer Expected:Pong payload,url,querystring,method:"{\"id\": 35}",/.netlify/functions/ping/teste,35 ,POST
  */
import { Context } from "@netlify/functions";

//estilo AWS Lambda - funciona melhor que a propria API deles.
export const handler = (event:any, context:Context, callback:any) => {
  const  url:string  = event.path; //Exemlo pegando parametros da rota
    const requestKey = event.headers["X-API-Key"]; //header personalizado
   // const apiKey = Netlify.env.get("MY_API_KEY"); //variavel de ambiente
   const apiKey = "";
    console.log("Request Key:", requestKey, " Api Key:", apiKey," event:", event, " context:", context  );
   
    if (1>=0 ) {
        //só pra ter uma validação simples com um caso de sucesso e outro de erro
        callback(null, {
          statusCode: 200,
          body:"Pong payload v2.0:" + JSON.stringify(event.body) + ",url:," + url +
           ",multiValueQueryString->idade:" +  JSON.stringify(event.multiValueQueryStringParameters.idade ) +  ",queryString->idade:" +  JSON.stringify(event.queryStringParameters.idade )+ ",method:                       " + event.httpMethod
                                                                                                                     
        });
    }

    //ex de como chamar uma funcao async e aguardar context.waitUntil(logRequest(req)); 
    callback(null, {
      statusCode: 401,
      body: "Sorry, no access for you."
    });
    return new Response("Sorry, no access for you.", { status: 401 });
};
 
/**
 * 
 *
 * schedule example
 *  import type { Config } from "@netlify/functions"

export default async (req: Request) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)
}

export const config: Config = {
    schedule: "@hourly"
}
 */
