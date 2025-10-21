#!/bin/bash


if [ "$EUID" -ne 0 ]; then
    echo "Este script precisa ser executado como root."
    exit 1
fi


FOLDER="/home/print" 

apt update
apt-get install inoticoming

# Verifica se a pasta NÃO existe (! -d) antes de criar
if [ ! -d "${FOLDER}/printed" ]; then
    mkdir "${FOLDER}/printed" 
fi

if [ ! -d "${FOLDER}/printed" ]; then
    mkdir "${FOLDER}/printed" 
fi

if [ ! -d "${FOLDER}/error" ]; then
    mkdir "${FOLDER}/error" 
fi

#lpstat -p lista as impressoras

PRINTER="HP_LaserJet_M109-M112"

#define a impressora padrão
lpoptions -d "$PRINTER"

while true; do
    echo "Aguardando...."
    sleep 5  # pausa de 5 segundos
    if [ ! -d "${FOLDER}" ]; then 
        echo "A pasta não existe. Aguardando...." >> $FOLDER/error/output.log
        continue
    fi

 
    cd "$FOLDER"
    for file in "$FOLDER"/*; do
        # VERIFICA SE É UM ARQUIVO REGULAR (NÃO DIRETÓRIO)
        if [ ! -f "$file" ]; then
            continue  # Ignora diretórios e outros não-arquivos
        fi


        filename=$(basename "$file")
        extension="${filename##*.}"
        # Converte a extensão para minúsculas para comparação case-insensitive
        extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

        if [[ "$extension_lower" == "pdf" || "$extension_lower" == "docx" || "$extension_lower" == "txt" || \
            "$extension_lower" == "jpg" || "$extension_lower" == "jpeg" || "$extension_lower" == "png" || \
            "$extension_lower" == "webp" || "$extension_lower" == "gif" ]]; then
            lpr "$file" &&
            mv "$file" "$FOLDER"/printed
        elif [[ "$extension" != "sh" ]]; then
            #impede de copiar o proprio script sh
            mv "$file" "$FOLDER/error/"
        fi
    done
   
done
