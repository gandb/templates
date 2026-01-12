#!/bin/bash

source=$(pwd)

#Guarda o local atual após executar o mvn
mvn clean package && pushd /tmp >/dev/null && cd "${source}/target/" && pwd && java -jar PoteFelicidade-1.0-SNAPSHOT.jar $1

#retorna
popd >/dev/null