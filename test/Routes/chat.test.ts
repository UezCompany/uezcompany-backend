import app from "@/application/server"
import { describe, expect, test } from "vitest"


describe('Chat routes', async () => {
     const LoginResponse = await app.inject({
          method: "POST",
          url: `/login`,
          payload: {
               email: "exemplo@gmail.com",
               senha: "exemplo123",
          },
     })

     expect(LoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
     expect(LoginResponse.headers["set-cookie"]).toBeDefined()

     const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

     test('GET /chats', async () => {
          const response = await app.inject({
               method: "GET",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/chats`,
          })

          expect(response.statusCode).toBe(200)
     })

     test('POST /chat/create/:requestedContactId', async () => {
          const idContact = '' // Definir o id de contato

          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/chat/create/${idContact}`,

               // se precisar adicionar body
          })

          expect(response.statusCode).toBe(201)
     })
})