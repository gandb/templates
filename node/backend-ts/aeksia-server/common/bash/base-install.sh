#!/bin/bash
 
function stop {
  echo "Parando container : $CONTAINER"
  docker container stop $CONTAINER
}

function rebuildImage {
   echo "Removendo container previamente criado com mesmo nome: $CONTAINER"
  docker container rm $CONTAINER
  echo "Removendo imagem previamente criada com mesmo nome: $IMAGEM"
  docker rmi $IMAGEM
  echo "Construindo uma nova imagem com nome : $IMAGEM"
  docker build -t $IMAGEM .
}

function help {
  echo "Os comandos possíveis para install.sh são:"
  echo "install.sh => ele instala uma nova versão da imagem no docker"
  echo "install.sh help => descreve os comandos possíveis"  
  echo "install.sh stop=> ele para o container no docker"
  echo "install.sh start=> ele inicia um container no docker"
  echo "install.sh restart=> ele reinicia um container no docker"
}

function start {
  echo "Subindoo container : $CONTAINER , com a imagem criada com nome : $IMAGEM"
  docker container start $CONTAINER
}

function newContainer {
   echo "Subindo um container novo de nome: $CONTAINER , com a imagem criada com nome : $IMAGEM"
  docker run  -p $LOCALPORT:$DOCKERPORT $MEMORYLIMIT $CORELIMIT -d --name $CONTAINER -v $SOURCE:/REMOTE  $IMAGEM
}
 
function updateGoogleCloudInfo {

  GCLOUD_FILE="cloudbuild.json"

  echo "Atualizando $GCLOUD_FILE"

  if [ ! -f  "../common/${GCLOUD_FILE}" ]
  then
    echo "Erro: Arquivo  $GCLOUD_FILE não encontrado"
    exit -1
  fi

  rm -f "$GCLOUD_FILE"
  cp "../common/${GCLOUD_FILE}" "$GCLOUD_FILE"
}
