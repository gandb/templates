#!/bin/bash

# Verifica se o texto foi passado
if [ $# -eq 0 ]; then
  echo "Falando: $0 \"seu texto aqui\""
  exit 1
fi

# Junta todos os argumentos em um só texto
texto="$*"

# Gera nome de arquivo em /tmp
filename=/tmp/voz_temp.wav
rm -f  $filename

echo "Gerando áudio para: \"$texto\""

# Usa pico2wave (se não tiver, instale com: sudo apt install libttspico-utils)
#pico2wave -w "$filename" -l="pt-BR" "$texto" && aplay "$filename" -nao tem pra portugues
pico2wave -w "$filename" "$texto"

mpv --cache=yes --audio-buffer=10  "$filename"


# Remove o arquivo temporário mesmo se ocorrer erro de áudio
rm -f "$filename"
