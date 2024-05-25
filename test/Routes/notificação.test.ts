import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe('Notificação routes', async () => {
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

     test('GET /notifications', async () => {
          const response = await app.inject({
               method: "GET",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/notifications`,
          })

          expect(response.statusCode).toBe(200)

     })

     test('POST /notifications/readall', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/notifications`,
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message', "Notificações lidas")
     })

     test('POST /notifications/read/:id', async () => {
          const id = '1'

          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/notifications/read/${id}`,
          })

          expect(response.statusCode).toBe(200)
     })
})