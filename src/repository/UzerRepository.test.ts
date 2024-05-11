import { describe, expect, test } from "vitest"
import { uzerRepository } from "./UzerRepository"



describe('Uzer repository', () => {
     // Quando vc criar os repository para criar uzers e necessario mockar o repository para nao dar conflito, use o beforeAll e o afterAll

     test('Listar todos os clientes do repositorio', async () => {
          const page = 1
          const pageSize = 10
          const uzers = await uzerRepository.getUzers(page, pageSize)
          expect(uzers).toHaveLength(0) // Esse valor represetna o numero de uzers no array
     })

     test('Lista um uzer a partir do seu nome', async ()=>{
          const userName = "" // Colocar o nome de um uzer existente no banco
          const uzer  = await uzerRepository.getUzerByUsername(userName)
          expect(uzer).toHaveProperty('id')  // Checa se no objeto existe altuma propriedade com o id
          expect(uzer).toHaveProperty('username')
     })

     test('Lista um uzer a partir do seu ID', async ()=>{
          const id = "" // Colocar o id de um uzer existente no banco
          const uzer  = await uzerRepository.getUzerById(id)
          expect(uzer).toHaveProperty('id') // Checa se no objeto existe altuma propriedade com o id
          expect(uzer).toHaveProperty('username')
     })
})