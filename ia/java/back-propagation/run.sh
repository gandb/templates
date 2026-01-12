#!/usr/bin/env bash
set -euo pipefail

# Diretório do script (projeto)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ">>> Compilando com: mvn clean package"
mvn clean package

 
 
if [ -d target/classes ]; then
  # Classe principal padrão (pode ser sobrescrita por variável de ambiente MAIN_CLASS)
  MAIN_CLASS=${MAIN_CLASS:-com.example.ai.Main}
  # Monta classpath incluindo libs em target/dependency caso existam
  CLASSPATH="target/classes"
  if [ -d target/dependency ]; then
    CLASSPATH="$CLASSPATH:target/dependency/*"
  fi

  echo ">>> Executando classe principal: $MAIN_CLASS"
  echo ">>> Classpath: $CLASSPATH"
  exec java -cp "$CLASSPATH" "$MAIN_CLASS" "$@"
fi

echo "Nenhum artefato executável encontrado em target/. Certifique-se de que o projeto produza um jar ou de que exista target/classes."
exit 1
