import app from "@/application/server";
import { describe, expect, test } from "vitest";


describe('Pedido routes', async () => {
     const publicURL = '' // A url padrao para requisição

     const responseCookie = await app.inject({
          method: 'POST',
          url: `${publicURL}/login`,
          payload: {
               email: '',
               senha: ''
          }
     })

     test('GET /pedidos', async () => {
          const response = await app.inject({
               method: 'GET',
               headers: {
                    "set-cookie": responseCookie.headers.cookie // talvez seja necessario mudar o 'cookie' para setCookie
               },
               url: `${publicURL}/pedidos`
          })

          expect(response.statusCode).toBe(200)
          // fazer testes mais especificos usando o payload
     })

     test('GET /pedidos/:id', async () => {
          const id = '' // ID do pedido 

          const response = await app.inject({
               method: 'GET',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               url: `${publicURL}/pedidos/${id}`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('GET /pedidos/uzer', async () => {
          const response = await app.inject({
               method: 'GET',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               url: `${publicURL}/pedidos/uzer`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('GET /pedidos/cliente/:id', async () => {
          const id = '' // ID do pedido 

          const response = await app.inject({
               method: 'GET',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               url: `${publicURL}/pedidos/cliente/${id}`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('GET /pedidosAtivos', async () => {
          const response = await app.inject({
               method: 'GET',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               url: `${publicURL}/pedidosAtivos`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('PUT /pedidos/finish/:id', async () => {
          const id = '' // ID do pedido
          const response = await app.inject({
               method: 'PUT',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               url: `${publicURL}/pedidos/finish/${id}`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('POST /create/pedido', async () => {
          const response = await app.inject({
               method: 'POST',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               body: {
                    categoria: "",
                    servicoId: "",
                    valor: "",
                    titulo: "",
               },
               url: `${publicURL}/create/pedido`
          })

          expect(response.statusCode).toBe(201)
           // fazer testes mais especificos usando o payload
     })

     test('PUT /pedido/avaliar/:id', async () => {
          const id = '' // ID do pedido
          const response = await app.inject({
               method: 'PUT',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               body: {
                    avalicao: 5
               },
               url: `${publicURL}/pedido/avaliar/${id}`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })

     test('PUT /pedido/assignUzer/:id', async () => {
          const id = '' // ID do pedido
          const response = await app.inject({
               method: 'PUT',
               headers: {
                    "set-cookie": responseCookie.headers.cookie
               },
               body: {
                    valor: 5,
                    idUzer: '' // ID do uzer
               },
               url: `${publicURL}/pedido/assignUzer/${id}`
          })

          expect(response.statusCode).toBe(200)
           // fazer testes mais especificos usando o payload
     })
})