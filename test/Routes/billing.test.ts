import app from "@/application/server"
import { describe, expect, test } from "vitest"


describe('Billing routes', async () => {
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

     test('POST /create/paymentMethod', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/create/paymentMethod`,
               body: {
                    paymentMethodId: '',
                    customerId: '',
               }
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message', 'Método de pagamento criado com sucesso')
     })

     test('POST /create/paymentIntent', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/create/paymentIntent`,
               body: {
                    amount: '',
                    currency: '',
                    serviceId: '',
               }
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('clientSecret')
     })

     test('POST /create/customer', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/create/customer`,
               
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message')
          expect(response.body).toHaveProperty('code')
          expect(response.body).toHaveProperty('email')
     })

     test('POST /confirm-payment', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/confirm-payment`,
               body: {
                    paymentIntentId: ''
               }
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('amountAfterFee')
     })

     test('POST /release-payment', async () => {
          const response = await app.inject({
               method: "POST",
               headers: {
                    cookie: cookieWithAuthorization,
               },
               url: `/release-payment`,
               body: {
                    paymentIntentId: ''
               }
          })

          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message', 'Payment released successfully')
     })

})