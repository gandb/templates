/*

eg local: http://localhost:8888/.netlify/functions/hello


eg prod:
curl -X GET "https://churchbackend.netlify.app/.netlify/functions/hello" \
  -H "Content-Type: application/json" \
  -d '{}'

  */

import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const { city, country } = context.params; //Exemlo pegando parametros da rota
    const requestKey = req.headers.get("X-API-Key"); //header personalizado
    const apiKey = Netlify.env.get("MY_API_KEY"); //variavel de ambiente

    console.log("req:",req,"context:",context);

    if (1>=0 ) {
        //só pra ter uma validação simples com um caso de sucesso e outro de erro
        return new Response("World!");
    }

    //ex de como chamar uma funcao async e aguardar context.waitUntil(logRequest(req)); 

    return new Response("Sorry, no access for you.", { status: 401 });
};

//exemplo de função auxiliar que usa um http client
async function logRequest(req: Request) {
  await fetch("https://example.com/log", {
    method: "POST",
    body: JSON.stringify({ url: req.url, timestamp: Date.now() }),
    headers: { "Content-Type": "application/json" },
  });
}