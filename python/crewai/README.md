# crewai
Projetos crewai

# instalação
Todos os projetos aqui desta pasta são instalados conforme abaixo:


## Instale o curl se não tiver:
apt install curl


## instale o manipulador de pacotes python uv feito em rust
curl -LsSf https://astral.sh/uv/install.sh | sh


## instale o python 3.12.3
uv python install 3.12.3

## depois instale o crewai 1.9.3
uv tool install crewai==1.9.3

## instalando o projeto
Dentro de cada projeto se usa o comando install caso não não tenha feito desde que tenha clonado o projeto do git:

crewai install

## rodando o projeto
crewai run
