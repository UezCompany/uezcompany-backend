import app from "@/application/server"
import { describe, expect, test } from "vitest"


describe('Auth routes', async () => {

     test('POST /register', async () => {
          const response = await app.inject({
               method: "POST",
               url: `/register`,
               payload: {
                    nome: "João Silva",
                    email: "joao.silva@example.com",
                    senha: "senhaSegura123",
                    cpf: "123.456.789-00",
                    dataNasc: "01/01/1990",
                    cep: "12345-678",
                    telefone: "(11) 91234-5678",
                    bairro: "Centro",
                    cidade: "São Paulo",
                    estado: "SP",
                    logradouro: "Rua Exemplo",
                    numero: "123",
                    complemento: "Apto 45",
                    idServico: "001",
                    usertype: "cliente",
                    username: "joaosilva"
               },
          })

          expect(response.statusCode).toBe(201)
          expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso!')
     })

     test('POST /login', async () => {
          const response = await app.inject({
               method: "POST",
               url: `/login`,
               payload: {
                    email: "exemplo@gmail.com",
                    senha: "exemplo123",
               },
          })

          expect(response.statusCode, "Cliente logado com sucesso").toBe(200)
          expect(response.headers["set-cookie"]).toBeDefined()
     })
     
     test('POST /logout', async () => {
          const response = await app.inject({
               method: "POST",
               url: `/logout`,
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message', 'Logout realizado com sucesso!')
     })
})