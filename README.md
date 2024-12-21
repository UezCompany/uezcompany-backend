# uez-api

A Uez API é uma aplicação de **networking**.

A ferramenta permite que um usuário se cadastre seja como o prestador de serviços(Uzer), ou alguém que necessita de um serviço (Cliente).

Os Clientes podem criar Pedidos de serviços, que serão assimiladas á algum Uzer competente, e finalizado..

O sistema gerenciará todo o fluxo, permitindo com que o Cliente possa acompanhar o andamento do seu Pedido, e o Uzer não precisará se preocupar com mais nada além de concluir seu serviço.

## Como rodar a aplicação

Antes de mais nada, certifique-se de ter o `pnpm` instalado, e também configure as variáveis de ambiente seguindo o `env.ts`

### Em ambiente de desenvolvimento

- Execute o comando: `docker compose up -d`, para criar e iniciar o container docker responsavel pelo banco de dados postgres.

- Depois, execute o `pnpm install` para instalar as dependências do projeto, e o `pnpm husky:prepare` para configurar o git hooks.

- Em seguida, rode o `pnpm migrate` para criar as tabelas no banco de dados, e o `pnpm seed:dev` para popular as tabelas.

- Por fim, rode o `pnpm dev` para iniciar a aplicação.

## Requisitos

### Requisitos funcionais

- [x] O usuário deve poder se cadastrar como Cliente;
- [x] O usuário deve poder se cadastrar como Uzer;
- [x] O Cliente deve poder criar um Pedido;
- [x] O Cliente deve poder visualizar a lista de Uzers;
- [x] O Uzer deve poder visualizar a lista de Pedidos;
- [x] O Uzer deve poder se "encarregar" de um Pedido;
- [x] O Uzer deve poder finalizar o Pedido;
- [x] O Cliente deve poder avaliar o Pedido;
- [x] O Cliente deve poder avaliar o Uzer que realizou seu Pedido;

### Regras de negócio

- [x] O usuário que se cadastra, deve poder escolher apenas uma opção de usuário (Uzer ou Cliente);
- [x] O Pedido só pode ter um único Uzer atrelado a ele;
- [x] O Pedido só deve ser dado como concluido, quando o cliente avalia-lo;

### Requisitos não-funcionais

- [x] O cadastro pode ser feito via Google;

## Documentação da API (Swagger)

Para acessar a documentação da API, acesse o link: [https://api.uezcompany.com/docs](https://api.uezcompany.com/docs)

## Banco de dados

Nessa aplicação utilizamos o PostgreSQL como banco de dados. Para ambiente de desenvolvimento seguiremos com o PostgreSQL pela facilidade de configuração via docker.

### Diagrama ERD

![Diagrama ERD do banco de dados](.github/assets/ERD.svg)
