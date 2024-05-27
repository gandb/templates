#!/bin/bash

#Se desejar, pode alterar os parametros abaixo
IMAGEM="aeksia-services-be-01"
CONTAINER="aeksia-container-be-01" 
LOCALPORT=80
DOCKERPORT=80
#MEMORYLIMIT="--memory=256m"

if [ ! -d "./docker" ]; then
	echo "O programa precisa ser iniciado do diretório <projeto>/front-end"
  exit 1
fi

#INICIO DA CoNFIGURACAO DO SOURCE FOLDER
cd ..
SOURCE="$( pwd )"
echo  "SOURCE=${SOURCE}"
#FIM DA CoNFIGURACAO DO SOURCE FOLDER

#importa os scripts
cd services
source ../common/bash/base-install.sh

if [ "$1" = "start" ]; then
    start
elif [ "$1" = "stop" ]; then
    stop
elif [ "$1" = "restart" ]; then
    stop
    start
elif [ "$1" = "help" ]; then
  help
else
  stop
  rebuildImage
  newContainer
fi
