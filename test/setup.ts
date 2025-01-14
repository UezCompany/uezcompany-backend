import app from "@/application/server"
import { beforeAll, afterAll, expect } from "vitest"

global.authorization = {
  tokenClient: "",
  tokenUezer: "",
}

beforeAll(async () => {
  const [clientAuthResponse, uezerAuthResponse] = await Promise.all([
    app.inject({
      method: "POST",
      url: `/auth`,
      payload: {
        email: "cliente@gmail.com",
        password: "cliente123",
      },
    }),
    app.inject({
      method: "POST",
      url: `/auth`,
      payload: {
        email: "uezer@gmail.com",
        password: "uezer123",
      },
    }),
  ])

  expect(clientAuthResponse.statusCode).toBe(200)
  expect(uezerAuthResponse.statusCode).toBe(200)

  global.authorization.tokenClient = JSON.parse(clientAuthResponse.body).token
  global.authorization.tokenUezer = JSON.parse(uezerAuthResponse.body).token
})

afterAll(() => {
  global.authorization.tokenClient = ""
  global.authorization.tokenUezer = ""
})
