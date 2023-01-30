#!/bin/bash

function help
{
  echo "Os comandos possíveis para deploy.sh são:"
  echo "deploy.sh => efetua o deploy"  
  echo "deploy.sh help => descreve os comandos possíveis"  
  echo "deploy.sh saveDockerFile=> ele renomeia o arquivo de docker"
  echo "deploy.sh restaureDockerFile=> ele retorna o arquivo docker para a posição de instalação"
}


function saveDockerfile {

  cd "/REMOTE/$FOLDER"

  DOCKER_FILE="Dockerfile"

  echo "Guardando docker file com nome de ${DOCKER_FILE}BKP"

  if [ ! -f  $DOCKER_FILE ]
  then
    echo "Erro: Arquivo  $DOCKER_FILE não encontrado em "
    pwd
    exit -1
  fi

  #atualiza a pasta remota
  rm -f "${DOCKER_FILE}BKP"
  mv "$DOCKER_FILE" "${DOCKER_FILE}BKP"

  #remove também da pasta de aplicacao
  rm -f "/BOOTAPP/${DOCKER_FILE}"
}

 function restaureDockerfile {

  cd "/REMOTE/$FOLDER"

  DOCKER_FILE="Dockerfile"

  echo "Restaurando docker file do arquivo ${DOCKER_FILE}BKP para ${DOCKER_FILE}"

  if [ ! -f "${DOCKER_FILE}BKP" ]
  then
    echo "Erro: Arquivo "${DOCKER_FILE}BKP" não encontrado"
    exit -1
  fi

  if [ -f $DOCKER_FILE ]
  then
    echo "Erro: Arquivo "${DOCKER_FILE}" já existe "
    exit -1
  fi
  mv "${DOCKER_FILE}BKP" "$DOCKER_FILE"

  #remove também da pasta de aplicacao
  rm -f "/BOOTAPP/${DOCKER_FILE}"
  rm -f "/BOOTAPP/${DOCKER_FILE}BKP"
}

function deploy()
{
  cd /BOOTAPP
  gcloud app deploy
}