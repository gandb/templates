
import { Context } from "@netlify/functions";
import { KeyTool } from "taulukko-commons";

import { factoryData } from "../api/commons/database/factory";

import { ResponseDTO } from "../api/commons/responsedto.js";

import { RequestContactDTO } from "../api/domains/contact/request-contact-dto.js"; 
import { Contact} from "../api/domains/contact/contact.js";

import { Email } from "../api/commons/email.js";
import { Description } from "../api/domains/contact/description.js";
import { Hostname } from "../api/domains/contact/host-name.js";
import { Name } from "../api/domains/contact/name.js";

import { HTTP_METHOD } from "../api/commons/methods.js";

const keyTool = new KeyTool();  
 

 /*
 Por enquanto esta funcionando com get em : http://localhost:8888/.netlify/functions/contact/teste?idade=35
 
 eg: http://localhost:8888/.netlify/functions/contact :

curl -X POST "http://localhost:8888/.netlify/functions/contact" \
  -H "Content-Type: application/json" \
  -d '{"name": "Edson Carli","email":"gandnegro@gmail.com","message":"Test"}'

  eg prod:
curl -X POST "https://churchbackend.netlify.app/.netlify/functions/contact" \
  -H "Content-Type: application/json" \
  -d '{"name": "Edson Carli","email":"gandnegro@gmail.com","message":"Test"}'

  Answer Expected:Pong payload,url,querystring,method:"{\"id\": 35}",/.netlify/functions/ping/teste,35 ,POST
  */ 
 


//estilo AWS Lambda - funciona melhor que a propria API deles.

const DEBUG:boolean = true;

function debug(... args:Array<any>)
{
    if(DEBUG)
    {
        console.debug("[DEBUG]-",... args);
    }
}

function error(... args:Array<any>)
{
    console.error("[ERROR]:",... args);
}


function log(... args:Array<any>)
{
    console.log("[INFO]:",... args);
}


async function  post (req:any, context:Context, callback:any)  {

    try{
        const id:string = keyTool.build(1,process.pid);

     

        const requestDTO:RequestContactDTO = JSON.parse( req.body); 

        log("Teste:",  requestDTO.name );

        const contact:Contact = new Contact(new Name(requestDTO.name),new Email(requestDTO.email),new Description(requestDTO.message),new Hostname(requestDTO.hostname));

        await contact.insert(); 

        return {
            statusCode: 200,
            body: JSON.stringify( {id})
        }; 

    }
    catch(e:any)
    {
        error(e);
        const responseDTO:ResponseDTO<string> = {code:503,data:"Erro desconhecido, tente mais tarde : " + e.message};
        return {
                statusCode: 503,
            body: JSON.stringify( responseDTO)    
        };  
    }
     
}

export const handler = async (event: any, context: Context, callback: any) => { 

    if( !event.httpMethod)
    {
        throw new Error("Lambda Function Error");
    }

    if( event.httpMethod.toLocaleUpperCase() != HTTP_METHOD.POST)
    {
        const responseDTO:ResponseDTO<string> = {code:403,data:"Method forbidden"};

        return {
            statusCode: 403,
            body: JSON.stringify( responseDTO)
        }; 
    }

    return await post(event,context,callback);

};
