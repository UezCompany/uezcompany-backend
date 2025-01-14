import app from "@/application/server"
import { uezerRepository } from "@/repository/UezerRepository"
import { describe, expect, test } from "vitest"

describe("Chat routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: {
      email: "cliente@gmail.com",
      password: "cliente123",
    },
  })

  expect(LoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)

  const cookieWithAuthorization = JSON.parse(LoginResponse.body).token

  test("GET /chats", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${cookieWithAuthorization}`,
      },
      url: `/chats`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("POST /chat/create/:requestedContactId", async () => {
    const uezerContact = await uezerRepository.getUezers(1, 1)
    const uezerId = uezerContact[0].id

    const response = await app.inject({
      method: "POST",
      headers: {
        authorization: `Bearer ${cookieWithAuthorization}`,
      },
      url: `/chat/create/${uezerId}`,
    })

    expect([201, 400]).toContain(response.statusCode)
  })
})
