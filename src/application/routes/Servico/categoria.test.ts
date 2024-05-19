import app from "@/application/server";
import { expect, test } from "vitest";


const publicURL = '' // url padrão para requisição

test('GET /categorias', async () => {
     const categoria = await app.inject({
          method: 'GET',
          url: `${publicURL}/categorias`
     })

     expect(categoria.statusCode).toBe(200)
})

