#!/bin/bash
LOG_FILE=/BOOTAPP/init.log

echo "Iniciado em :" >> $LOG_FILE
date >> $LOG_FILE

#Remove previous semaphore
rm -f /BOOTAPP/docker/.semaphore

#inicia o processo de cron
cron

#roda o node
npm run start2