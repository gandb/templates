#!/bin/bash

#Se desejar, pode alterar os parametros abaixo
IMAGEM="valert-fe-01"
CONTAINER="valert-container-fe-01"
LOCALPORT=8080
DOCKERPORT=8080
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
cd front-end
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

