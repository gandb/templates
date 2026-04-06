# church-backend
Backend para church.

Existem duas formas, uma é usando a API do netlify e outra é uma cópia do Lambda pra AWS.

Nos exemplos, o ping é em AWS e funciona melhor, por incrivel que pareça, do que a API do próprio netlify

Ja o do hello, é a API deles.

Uma opção de banco que o netlify da é o https://docs.netlify.com/build/data-and-storage/netlify-blobs/

Instalaćão:
*1- Instale as dependencias do projeto : npm install
*2- Se logue no netfly : npx netlify login ou npm run login
*3- Se não tem um projeto, execute o comando a seguir para criá-lo: npx netlify dev
*4- Para ver os logs remotos use : npx netlify logs:functions ou npx netlify logs:deploy para ver o log do deploy
*5- Para gerenciar as variáveis de ambiente use : npm run env
*6- Para rodar em dev, use : npx netlify dev ou npm run dev
*7- Para dar deploy use : npx netlify deploy  
*8- na pasta dist/public voce pode colocar qualquer coisa que seja estatica, precisa criar algo no build pra copiar pra la o que precisa pois será apagado toda vez
*9-para importar as variaveis de ambiente : npx netlify env:import .env
*10- documentacao completa em https://cli.netlify.com/


/*
Variáveis de ambiente necessárias:
CHURCH_ENVIROMENT=As opções são: localhost,dev,prod
CHURCH_BACKEND_HOST=url do backend
CHURCH_BACKEND_PORT=Porta do Backend
CHURCH_BACKEND_PROTOCOL=https ou http conforme o protocolo
CHURCH_DB_HOST=IP do banco de dados
CHURCH_DB_PORT=Porta do banco de dados
CHURCH_DB_NAME=nome do database
CHURCH_DB_USER=usuário do database
CHURCH_DB_PASSWORD=Senha do banco de dados
CHURCH_IS_FRONTEND=TRUE ou FALSE se o backend é também o frontend na mesma máquina 
 
*/