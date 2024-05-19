import app from "@/application/server";
import { describe, expect, test } from "vitest";


describe('Serviço Routes', () => {
     const publicURL = '' // a url padrão para requisição
     test('GET /servicos', async () => {
          const servico = await app.inject({
               method: 'GET',
               url: `${publicURL}/servicos`
          })

          expect(servico.statusCode).toBe(200)
     })

     test('GET /servicos/:id', async () => { 
          const id ='' // ID de um serviço 
          const servico = await app.inject({
               method: 'GET',
               url: `${publicURL}/servicos/${id}`
          })

          expect(servico.statusCode).toBe(200)
     })

     test('GET /servicos/categoria/:categoria', async () => { 
          const categoria ='' // qualquer categoria
          const servico = await app.inject({
               method: 'GET',
               url: `${publicURL}/servicos/categoria/${categoria}`
          })

          expect(servico.statusCode).toBe(200)
     })
})