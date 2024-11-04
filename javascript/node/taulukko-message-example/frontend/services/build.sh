#!/bin/sh

#nao funciona via comando do node
echo "Compilando arquivos..."
tsc --sourceMap

echo "Empacotando em all.zip..."
rm -r -f all.zip
zip all.zip -r *.json *.js *.ts functions

echo "Build finalizado com sucesso em"
date