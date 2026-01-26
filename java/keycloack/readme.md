# Keycloak Hello World com Java Spring e Docker

## Descrição
Este projeto é um exemplo básico de integração do **Keycloak** com **Spring Boot** para autenticação e autorização, executado em ambiente **Docker**.

## Objetivos
- Entender o funcionamento básico do Keycloak
- Integrar Keycloak com Spring Boot
- Executar a aplicação em containers Docker
- Implementar fluxo de autenticação simples

## Arquitetura
```
┌─────────────────┐
│   Spring Boot   │
│   Application   │
└────────┬────────┘
         │
    OpenID Connect
         │
┌────────▼────────┐
│   Keycloak      │
│   (Auth Server) │
└─────────────────┘
```

## Pré-requisitos
- Docker e Docker Compose
- Java 11+
- Maven

## Componentes
- **Keycloak**: Servidor de autenticação
- **Spring Boot**: Aplicação web
- **PostgreSQL**: Banco de dados (opcional)

## Estrutura
```
.
├── docker-compose.yml
├── src/
│   └── main/
│       ├── java/
│       └── resources/
│           └── application.yml
└── pom.xml
```

## Como Usar
1. Clonar o repositório
2. Executar `docker-compose up`
3. Acessar a aplicação em `http://localhost:8080`
4. Realizar login com as credenciais configuradas

## Próximos Passos
- Configurar roles e permissões
- Implementar endpoints protegidos
- Adicionar logout
