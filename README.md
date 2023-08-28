# UEZ Company - Backend e API

Bem-vindo ao repositório do backend e da API da UEZ Company. Este repositório contém o código-fonte e a documentação relacionada ao servidor e à API da nossa aplicação.

## Visão Geral

O backend da UEZ Company é construído seguindo a arquitetura Modelo-Visão-Controlador (MVC) para garantir uma separação clara entre as camadas lógicas e oferecer um código organizado e escalável. Esta aplicação backend oferece suporte às operações necessárias para a nossa plataforma.

## Tecnologias Utilizadas

- Linguagem: Node.js
- Framework: Express
- Banco de Dados: MongoDB
- Outras tecnologias: JWT, bcrypt, cors

## Instalação

Siga os passos abaixo para configurar e executar o backend localmente:

1. Clone este repositório: `git clone https://github.com/UezCompany/uezcompany-backend.git`
2. Acesse o diretório do projeto: `cd uezcompany-backend`
3. Instale as dependências: `npm install` ou `yarn install`
4. Configure as variáveis de ambiente (consulte "Configuração" abaixo)
5. Execute o servidor: `npm start` ou `yarn start`

## Configuração

Antes de executar o backend, é necessário configurar as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de acordo com a configuração necessária.

Exemplo de `.env`:

```
PORT=3333
DB_CONNECTION_STRING=mongodb://localhost:27017/uezdb
DB_USER=uezcompanyuser
DB_PASSWORD=uezcompany123
SECRET_KEY=seu_secret_key
```


## Rotas da API

A API da UEZ Company oferece as seguintes rotas principais:

- `GET /api/clientes`: Retorna a lista de clientes.
- `GET /api/clientes/:id`: Retorna os detalhes do cliente com o ID especificado.
- `PUT /api/clientes/:id`: Atualiza os dados do cliente com o ID especificado.
- `DELETE /api/clientes/:id`: Exclui o cliente com o ID especificado.

=====================================================

- `GET /api/uzers`: Retorna a lista de uzers.
- `GET /api/uzers/:id`: Retorna os detalhes do uzer com o ID especificado.
- `PUT /api/uzers/:id`: Atualiza os dados do uzer com o ID especificado.
- `DELETE /api/uzers/:id`: Exclui o uzer com o ID especificado.

======================================================

- `POST /api/login`: Realiza o login do usuário.

``` json
// Dados da Requisição
{
    "email": "J3b1u@example.com",
    "password": "123456"
}

```

- `POST /api/register`: Realiza o registro de um usuário (Cliente ou Uzer).

``` json
// Dados da Requisição
{
    "userType": "cliente",
    "nome": "João da Silva",
    "email": "J3b1u@example.com",
    "password": "123456",
    "cpf": "123.456.789-01",
    "rg": "123456",
    "dataNascimento": "01/01/2000",
    "telefone": "+55 (00) 00000-0000",
    "cep": "00000-000",
    "endereco": {
        "logradouro": "Rua",
        "numero": "123",
        "complemento": "Casa",
        "bairro": "Centro",
        "cidade": "São Paulo",
        "estado": "SP"
    },
    "dataCriacao": "01/01/2021"
}
```

Consulte a documentação completa da API [aqui](link-para-documentacao-da-api) para obter informações detalhadas sobre cada rota, os parâmetros aceitos e as respostas retornadas.

## Contribuição

Sinta-se à vontade para contribuir com o desenvolvimento deste projeto. Abra uma "issue" para relatar problemas ou envie um "pull request" com suas melhorias. Lembre-se de seguir nossas diretrizes de contribuição.

## Contato

Em caso de dúvidas ou necessidade de suporte, entre em contato conosco pelo email: contato@uezcompany.com.

---
