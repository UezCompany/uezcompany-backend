import request from "supertest"
import app from "./application/server"

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

// Testes
describe("Testes para o servidor", () => {
  const server = request(app.server)

  it('Deve retornar "Server is running" ao acessar a rota raiz', async () => {
    const response = await server.get("/")
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Server is running")
  })

  it("Deve falhar no login com credenciais inexistentes", async () => {
    const response = await server.post("/login").send({
      email: "usuario@example.com",
      senha: "senha_incorreta",
    })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Usuário não encontrado",
    })
  })

  it("Deve falhar no login com email correto e senha incorreta", async () => {
    const response = await server.post("/login").send({
      email: "cliente@gmail.com",
      senha: "senha_incorreta",
    })

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      message: "Credenciais inválidas",
      code: "UNAUTHORIZED",
    })
  })

  it("Deve ter sucesso no login com credenciais corretas", async () => {
    const response = await server.post("/login").send({
      email: "cliente@gmail.com",
      senha: "cliente123",
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
  })
})
