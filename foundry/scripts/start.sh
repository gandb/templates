#!/bin/bash

echo "Iniciando Foundry VTT"
cd /root/foundryvtt
node --max-old-space-size=1024 --initial-old-space-size=1024 main.js