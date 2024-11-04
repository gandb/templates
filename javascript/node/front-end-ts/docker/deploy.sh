#!/bin/bash

cd ..

FOLDER="front-end"

source /REMOTE/common/bash/base-deploy.sh

if [ "$1" = "" ]; then
  saveDockerfile
  deploy
  restaureDockerfile
elif [ "$1" = "saveDockerfile" ]; then
  saveDockerfile
elif [ "$1" = "restaureDockerfile" ]; then
  restaureDockerfile
elif [ "$1" = "help" ]; then
  help    
else
  echo "Erro, parâmetro $1 não reconhecido"
fi

