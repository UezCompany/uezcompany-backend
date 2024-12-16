import { assert, describe, expect, test } from "vitest"
import { serviceRepository } from "@/repository/ServiceRepository"
import { Service } from "@prisma/client"

const fields = ["id", "name", "type", "description"]

describe("Service repository", () => {
  let TestServiceRepository: Service

  test("Listar todos os serviços", async () => {
    const services = await serviceRepository.getServices()
    assert(Array.isArray(services), "Expected an array of services")
    TestServiceRepository = services[0]
    services.forEach((service) => {
      fields.forEach((field) => {
        expect(service).toHaveProperty(field)
      })
    })
  })

  test("Listar todos os serviços pela categoria", async () => {
    const category = "Programação"
    const services = await serviceRepository.getServicesByCategory(category)
    fields.forEach((field) => {
      expect(services[0]).toHaveProperty(field)
    })
  })

  test("Listar todos os serviços pelo id", async () => {
    const id = TestServiceRepository.id
    const service = await serviceRepository.getServicesById(id)
    fields.forEach((field) => {
      expect(service).toHaveProperty(field)
    })
  })

  test("Listar todas as categorias", async () => {
    const categorias = await serviceRepository.getCategories()
    const categoria = categorias[0]
    assert(Array.isArray(categorias), "Expected an array of categorias")
    expect(categoria).toHaveProperty("id")
  })
})
