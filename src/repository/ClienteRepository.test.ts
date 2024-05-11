import { describe, expect, test } from "vitest"
import { clienteRepository } from "./ClienteRepository"

describe('Client repository', () => {
     // Quando vc criar os repository para criar clientes e necessario mockar o repository para nao dar conflito, use o beforeAll e o afterAll

     test('Listar todos os clientes do repositorio', async () => {
          const page = 1
          const pageSize = 10
          const clients = await clienteRepository.getClientes(page, pageSize)
          expect(clients).toHaveLength(0) // Esse valor represetna o numero de clientes no array
     })

     test('Lista um cliente a partir do seu nome', async ()=>{
          const userName = "" // Colocar o nome de usario existente no banco
          const client  = await clienteRepository.getClienteByUsername(userName)
          expect(client).toHaveProperty('id') // Checa se no objeto existe altuma propriedade com o id
          expect(client).toHaveProperty('username')
     })

     test('Lista um cliente a partir do seu ID', async ()=>{
          const id = "" // Colocar o id de usario existente no banco
          const client  = await clienteRepository.getClienteById(id)
          expect(client).toHaveProperty('id') // Checa se no objeto existe altuma propriedade com o id
          expect(client).toHaveProperty('username')
     })
})