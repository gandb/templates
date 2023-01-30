@echo off
REM Inspired by https://github.com/lindycoder/prepopulated-mysql-container-example/blob/master/Dockerfile
set CONTAINER="brainandbones-mariadb-001"
set IMAGE="brainandbones-mariadb-image"
set PORT=3333
@echo on
echo Create image
docker build --tag %IMAGE% .
echo Removing previous container
docker container stop %CONTAINER%
docker container rm %CONTAINER%
echo Creating and starting a new  container
docker run -p 127.0.0.1:%PORT%:3306  --name %CONTAINER% -e -d %IMAGE%
