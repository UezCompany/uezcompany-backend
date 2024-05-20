import app from "@/application/server"
import { expect, test } from "vitest"

test("GET /uzers", async () => {
  const userLoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "cliente@gmail.com",
      senha: "cliente123",
    },
  })

  expect(userLoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(userLoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

  const response = await app.inject({
    method: "GET",
    headers: {
      cookie: cookieWithAuthorization,
    },
    url: `/uzers`,
  })

  expect(response.statusCode).toBe(200)
})
