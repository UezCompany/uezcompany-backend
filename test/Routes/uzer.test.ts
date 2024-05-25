import app from "@/application/server"
import { describe, expect, test } from "vitest"


describe('Uzer Routes', async () => {
     const userLoginResponse = await app.inject({
          method: "POST",
          url: `/login`,
          payload: {
               email: "cliente@gmail.com",
               senha: "cliente123",
          },
     })

     expect(userLoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
     expect(userLoginResponse.headers["set-cookie"]).toBeDefined()


     test("GET /uzers", async () => {
          const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

          const response = await app.inject({
               method: "GET",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/uzers`,
          })

          expect(response.statusCode).toBe(200)
     })
     
     test("GET /uzers/:slug", async () => {
          const slug = "uzer"

          const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

          const response = await app.inject({
               method: "GET",
               headers: {
                    cookie: cookieWithAuthorization, 
               },
               url: `/uzers/${slug}`,
          })

          expect(response.statusCode).toBe(200)
          // Fazer testes do retorno payload
     })

})