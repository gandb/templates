#!/bin/bash

#Se desejar, pode alterar os parametros abaixo
#IMAGEM="tv2-fe-01"

#source ../common/bash/base-install.sh

if [ "$2" = "" ]; then
  ENVIROMENT="beta"
else
  ENVIROMENT="$2"
fi


if [ ! -d "./docker" ]; then
	echo "O programa precisa ser iniciado do diretório <projeto>/front-end"
    exit 1
fi



function build {  
  echo "Construindo aplicação para o ambiente $ENVIROMENT"
  rm -f ./src/config/servers-choosed.ts
  cp "./src/config/servers-$ENVIROMENT.ts" "./src/config/servers-choosed.ts"  
  npm run buildvue  
  rm -f ./src/config/servers-choosed.ts
  cp "./src/config/servers-local.ts" "./src/config/servers-choosed.ts"
}


function deploy {
  echo "Parando containners locais"  
  docker stop contas-container-fe-01
  docker stop contas-container-be-01
  if [ "$ENVIROMENT" = "production" ]; then
    echo "Enviando projeto para o servidor de produção"   
    gcloud config set project v-alert && gcloud app deploy
  else
    echo "Enviando projeto para o servidor beta" 
    gcloud config set project v-alert && gcloud app deploy
  fi  
}

if [ "$1" = "build" ]; then
  build
elif [ "$1" = "deploy" ]; then
  deploy
elif [ "$1" = "buildeploy" ]; then
  build
  deploy  
else
  echo "Os subcomandos válidos são build, deploy  e buildeploy" 
fi

