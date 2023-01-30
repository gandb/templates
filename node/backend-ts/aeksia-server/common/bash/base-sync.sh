#!/bin/bash
 
LOG_FILE="${REMOTE_PROJECT}/sync.log"
SEMAPHORE_FILE="/BOOTAPP/docker/.semaphore"

function sync
{

  if [  -f  $SEMAPHORE_FILE ]
  then
    exit
  fi

  echo "started" > $SEMAPHORE_FILE

  if [  !-f  $LOG_FILE ]
  then
    echo "Iniciando monitor de mudanças..." > $LOG_FILE
    echo "Copiando os arquivos remotos para a aplicação docker" >> $LOG_FILE
  fi

  date >> $LOG_FILE

  while [  -d /REMOTE ]; do
    cd "${REMOTE_PROJECT}"
    cp -rvu `ls -A | grep -vE "node_modules"`  /BOOTAPP >> $LOG_FILE
    sleep 5
  done

}