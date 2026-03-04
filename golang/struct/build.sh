#!/bin/bash

if [[ $1 =~ \.go ]]; then
  echo  -e -e "\033[37;41mVocê passou por engano o nome do fonte e nao o nome do programa. O nome do programa deve ser igual ao nome do fonte mas sem a extensão\033[0m"
  echo -e -e "\033[37;41mCaso você queria um nome diferente faça: go build arquivo.go -o nomedoprograma\033[0m"
  exit 1
fi


rm -r -f "$1"

go build "$1.go"