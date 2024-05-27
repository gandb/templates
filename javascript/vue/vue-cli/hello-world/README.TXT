
Passo 1 - Instlaando o vue cli globalmente (só na primeira vez)
#npm install -g @vue/cli

Para testar pode fazer :
#vue --version

Passo 2 - Instalando serviços globais para ajudar na prototipação globalmente (só na primeira vez)

#npm install -g @vue/cli-service-globalteste


Para testar pode fazer:
#vue serve -h

Passo 3 - Criar arquivo inicial:
Crie um arquivo chamado App.vue com o conteúdo:

<template>
  <h1>Hello!</h1>
</template>


Passo 4 - Rodar o servidor (ele automaticamente procura uma entrada App.vue, ou main.js ou outros)

#vue serve

Para testar, pode acessar:
http://localhost:8080/

