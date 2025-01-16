import app from "@/application/server"
import { uezerRepository } from "@/repository/UezerRepository"
import { describe, expect, test } from "vitest"
import { login } from "../test-utils"

describe("Chat routes", async () => {
  const { token } = await login("cliente@gmail.com", "cliente123")

  test("GET /chats", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
      },
      url: `/chat/create/${uezerId}`,
    })

    expect([201, 400]).toContain(response.statusCode)
  })
})
