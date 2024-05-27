
Passo 1 - Instlaando o vue cli globalmente (só na primeira vez)
#npm install -g @vue/cli

Para testar pode fazer :
#vue --version

Passo 2 - Instalando serviços globais para ajudar na prototipação globalmente (só na primeira vez)

#npm install -g @vue/cli-service-globalteste


Para testar pode fazer:
#vue serve -h

Passo 3 - Criar projeto vazio, rode:
#vue create <nome do projeto>

Ele te perguntará se deseja configurar os plugins, os defaults como o babel, ou configurar manualmente onde poderá por exemplo selecionar TypeScript.

Isso criará uma pasta com o nome do projeto e dentro da pasta ele irá configurar o projeto com tudo que é necessário.


Passo 4 - Rodar o servidor

Entre na pasta do projeto e rode:
#npm run serve

Para testar, pode acessar:
http://localhost:8080/

Para mais informações sobre as configurações selecionadas ele coloca no arquivo README.md dentro do projeto criado.

