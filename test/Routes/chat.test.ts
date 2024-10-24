import app from "@/application/server"
import { uzerRepository } from "@/repository/UzerRepository"
import { describe, expect, test } from "vitest"

describe("Chat routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "cliente@gmail.com",
      password: "cliente123",
    },
  })

  expect(LoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(LoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

  test("GET /chats", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/chats`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("POST /chat/create/:requestedContactId", async () => {
    const uzerContact = await uzerRepository.getUzers(1, 1)
    const uzerId = uzerContact[0].id

    const response = await app.inject({
      method: "POST",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/chat/create/${uzerId}`,
    })

    expect([201, 400]).toContain(response.statusCode)
  })
})
