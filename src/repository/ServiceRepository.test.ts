import { assert, describe, test } from "vitest";
import { serviceRepository } from "./ServiceRepository"

describe('Service repository', () => {
     let TestServiceRepository: any

     test('Listar todos os serviços', async () => {
          const services = await serviceRepository.getServices();
          assert(Array.isArray(services), 'Expected an array of services') // verifica se o service e um array
          TestServiceRepository = services[0]
          services.forEach(service => {
               expect(service).toHaveProperty("id")
               expect(service).toHaveProperty("nome")
          })
     })

     test('Listar todos os serviços pela categoria', async () => {
          const category = TestServiceRepository.nome // Colocar o nome da categoria
          const services = await serviceRepository.getServicesByCategory(category)
          expect(services[0]).toHaveProperty('id') // alterar para propriedades mais especificas
          expect(services[0]).toHaveProperty('categoria')
     })

     test('Listar todos os serviços pela categoria', async () => {
          const id = TestServiceRepository.id // Colocar o id da categoria
          const services = await serviceRepository.getServicesById(id)
          expect(services[0]).toHaveProperty('id') // alterar para propriedades mais especificas
          expect(services[0]).toHaveProperty('nome')
     })

     test('Listar todas as categorias', async () => { 
          const categorias = await serviceRepository.getCategories()
          const categoria = categorias[0]
          assert(Array.isArray(categorias), 'Expected an array of categorias')
          expect(categoria).toHaveProperty("id")
     })

})