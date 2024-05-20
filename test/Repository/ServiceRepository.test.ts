import { assert, describe, expect, test } from "vitest"
import { serviceRepository } from "@/repository/ServiceRepository"
import { Servicos } from "@prisma/client"

describe("Service repository", () => {
  let TestServiceRepository: Servicos

  test("Listar todos os serviços", async () => {
    const services = await serviceRepository.getServices()
    assert(Array.isArray(services), "Expected an array of services")
    TestServiceRepository = services[0]
    services.forEach((service) => {
      expect(service).toHaveProperty("id")
      expect(service).toHaveProperty("nome")
    })
  })

  test("Listar todos os serviços pela categoria", async () => {
    const category = "Programação"
    const services = await serviceRepository.getServicesByCategory(category)
    expect(services[0]).toHaveProperty("id")
  })

  test("Listar todos os serviços pelo id", async () => {
    const id = TestServiceRepository.id
    const service = await serviceRepository.getServicesById(id)
    expect(service).toHaveProperty("id")
    expect(service).toHaveProperty("nome")
  })

  test("Listar todas as categorias", async () => {
    const categorias = await serviceRepository.getCategories()
    const categoria = categorias[0]
    assert(Array.isArray(categorias), "Expected an array of categorias")
    expect(categoria).toHaveProperty("id")
  })
})
