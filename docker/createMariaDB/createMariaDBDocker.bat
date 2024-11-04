@echo off
set CONTAINER="contas-mariadb-001"
set IMAGE="contas-mariadb-image"
set ROOT_PASSWORD="PWS"
set PORT=3344
@echo on
echo Create image
docker build --tag %IMAGE% .
echo Removing previous container
docker container stop %CONTAINER%
docker container rm %CONTAINER%
echo Creating and starting a new  container
docker run --detach -p 127.0.0.1:%PORT%:3306  --name %CONTAINER% --env MARIADB_ROOT_PASSWORD=%ROOT_PASSWORD%  -e -d %IMAGE%
