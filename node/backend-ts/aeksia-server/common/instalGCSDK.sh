#!/bin/bash

echo "Instalando Google Cloud SDK"

echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

sudo apt-get update && sudo apt-get install google-cloud-sdk

sudo apt-get install unixODBC unixODBC-dev

sudo apt-get install google-cloud-sdk-app-engine-java google-cloud-sdk-app-engine-python google-cloud-sdk-pubsub-emulator google-cloud-sdk-bigtable-emulator google-cloud-sdk-datastore-emulator kubectl