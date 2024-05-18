import app from "@/application/server";
import { expect, test } from "vitest";


test('GET /uzers/:slug', async () => {
     const publicURL = '' // A url padrao para requisição
     const slug = '' // A slug do usuario

  
     const responseCookie = await app.inject({
          method: 'POST',
          url: `${publicURL}/login`,
          payload: {
               email: '',
               senha: ''
          }
     })


     const response = await app.inject({
          method: 'GET',
          headers: {
               "set-cookie": responseCookie.headers.cookie // talvez seja necessario mudar o 'cookie' para setCookie
          },
          url: `${publicURL}/uzers/${slug}`
     })

     expect(response.statusCode).toBe(200)
     // Fazer testes do retorno payload 
})
