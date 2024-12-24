import app from "@/application/server"
import { Speciality } from "@prisma/client"
import { describe, expect, test } from "vitest"

describe("Speciality Routes", () => {
  let TestSpecialityRoutes: Speciality

  test("GET /specialities", async () => {
    const { statusCode, body } = await app.inject({
      method: "GET",
      url: `/specialities`,
    })

    TestSpecialityRoutes = JSON.parse(body)[0]
    expect(statusCode).toBe(200)
  })

  test("GET /specialities/:id", async () => {
    const id = TestSpecialityRoutes.id // speciality id
    const speciality = await app.inject({
      method: "GET",
      url: `/specialities/${id}`,
    })

    expect(speciality.statusCode).toBe(200)
  })

  test("GET /specialities/profession/:professionName", async () => {
    const profissão = "Programacão" // any profession
    const speciality = await app.inject({
      method: "GET",
      url: `/specialities/profession/${profissão}`,
    })

    expect(speciality.statusCode).toBe(200)
  })
})
