#!/bin/bash

# Verifica se há mais de um processo contendo "foundry"
process_count=$(ps aux | grep -i "[f]oundry" | wc -l)

if [ "$process_count" -gt 1 ]; then
    echo "Foundry está ligado, desligue ele antes de executar o backup."
    exit 1
fi

: <<'REM'
# Define a data no formato YYYYMMDD
DateStamp=$(date +"%Y%m%d")

script5eToolsDir="./5etools/images"
data5eToolsDir="../Data/images/5etools"
bkpDir="bkp"

# Verificações de diretório
if [ ! -d "$script5eToolsDir" ]; then
    echo "O diretório $script5eToolsDir não existe. Saindo do programa."
    read -p "Pressione enter para sair..."
    exit 1
fi

if [ ! -d "$data5eToolsDir" ]; then
    echo "O diretório $data5eToolsDir não existe. Saindo do programa."
    read -p "Pressione enter para sair..."
    exit 1
fi

if [ ! -d "$bkpDir" ]; then
    echo "O diretório $bkpDir não existe. Criando diretório..."
    read -p "Pressione enter para continuar..."
    mkdir -p "$bkpDir"
fi

# Move a pasta 5etools para a localização atual
mv "$data5eToolsDir" "$script5eToolsDir/5etools"

# Compacta a pasta Data
zip -r -q "${bkpDir}/${DateStamp}Data.zip" "../Data"

# Move de volta a pasta 5etools
mv "$script5eToolsDir/5etools" "$data5eToolsDir"

echo "Operações concluídas."
