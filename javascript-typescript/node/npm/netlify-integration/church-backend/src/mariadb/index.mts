/*eg: http://localhost:8888/.netlify/functions/ping:teste
 eg de request:
curl -X POST "http://localhost:8888/.netlify/functions/mariadb?name=35" \
  -H "Content-Type: application/json" \
  -d '{"id": 35}'
eg prod:
curl -X POST "https://churchbackend.netlify.app/.netlify/functions/mariadb/teste?idade=33" \
  -H "Content-Type: application/json" \
  -d '{"id": 35}'

  Answer Expected:Pong payload,url,querystring,method:"{\"id\": 35}",/.netlify/functions/ping/teste,35 ,POST
  */
import { Context } from "@netlify/functions";
import { KeyTool } from "taulukko-commons";
import { factoryData } from "../api/commons/database/factory";

//estilo AWS Lambda - funciona melhor que a propria API deles.
export const handler = async (event: any, context: Context, callback: any) => {


  const url: string = event.path; //Exemlo pegando parametros da rota
  const requestKey = event.headers["X-API-Key"]; //header personalizado
  // const apiKey = Netlify.env.get("MY_API_KEY"); //variavel de ambiente
  const apiKey = "";
  console.log("Request Key:", requestKey, " Api Key:", apiKey, " event:", event, " context:", context);



  const name = "v1:" + event.queryStringParameters?.name;

  if (!name) {
    //só pra ter uma validação simples com um caso de sucesso e outro de erro
    return {
      statusCode: 503,
      body: "Sorry, no access for you."
    };
  }

  try {

    const pool = await factoryData.getPool();
    const keytool = new KeyTool();

    const id: string = keytool.build(1, process.pid);
    const sql = "INSERT INTO contacts (id,name,email,description,domain) VALUES (?,?,?,?,?)";
    const params: Array<any> = [id, name, "ganoca@gmail.com", "desc teste", "localhost"];
    const res = await pool.execute(sql, params);
    console.log("debug1");
    console.log("Banco de dados retornou:", res, ", time:", Date.now());
    console.log("debug2");

    return {
      statusCode: 200,
      body: "Everything is ok , user " + name + " insert with success"
    };

  } catch (e) {
    console.error(e);
    return {
      statusCode: 503,
      body: "Error in insert database cod:002 " + JSON.stringify(e)
    };
  }

};
