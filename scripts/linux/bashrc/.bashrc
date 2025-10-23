#ESTE TRECHO DEVE SER ADICIONADO NO FINAL DO ARQUIVO .bashrc
# (...)
#START EDSON CONFIG
JDK_PATH="/media/gandb/extensao001/Programs/Portables/Linux/jdk-25/bin"
export JAVA_HOME="/media/gandb/extensao001/Programs/Portables/Linux/jdk-25"
export PATH="$JDK_PATH:$PATH"
export WIA_ENVIROMENT="dev"
export WIA_ENGINE_AI="OPEN_AI"
export WIA_OPEN_AI_KEY="xpto"

export CHURCH_IS_FRONTEND="TRUE"
export CHURCH_BACKEND_PORT=3030


alias wks='cd /media/gandb/workspace'
alias foundry='cd /media/gandb/extensao001/Programs/Instalados/Foundry'
alias foundryserver='ssh root@fronteiras.hopto.org'
alias hist=hstr                    # alias pra  hstr, tem que instalar hstr antes

#exemplo de função para comandos complexos que alias não resolva
ping(){
   #se quiser receber parametros a assinatura da funcao nao muda
   #mas os parametros são recebidos nas variáveis $1 $2 $3...
   echo "pong"
}


# Church MariaDB Configuration
# Variáveis de ambiente para conexão com MariaDB
export CHURCH_DB_HOST='69.55.54.94'
export CHURCH_DB_USER='church'
export CHURCH_DB_PASSWORD='xpto'
export CHURCH_DB_NAME='church'
export CHURCH_DB_PORT='3306'

#END EDSON CONFIG
# (...)