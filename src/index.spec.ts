import request from "supertest"
import app from "./server"

// Testes
describe("Testes para o servidor", () => {
  const server = request(app)

  it('Deve retornar "Server is running" ao acessar a rota raiz', async () => {
    const response = await server.get("/")
    expect(response.status).toBe(200)
    expect(response.body).toBe("Server is running")
  })

  it("Deve falhar no login com credenciais inexistentes", async () => {
    const response = await server.post("/login").send({
      email: "usuario@example.com",
      senha: "senha_incorreta",
    })

    expect(response.status).toBe(401) // Código 401 indica falha na autenticação
    expect(response.body).toEqual({ message: "Usuário não encontrado" })
  })

  it("Deve falhar no login com email correto e senha incorreta", async () => {
    const response = await server.post("/login").send({
      email: "cliente@gmail.com",
      senha: "senha_incorreta",
    })

    expect(response.status).toBe(401) // Código 401 indica falha na autenticação
    expect(response.body).toEqual({ message: "Credenciais inválidas" })
  })

  it("Deve ter sucesso no login com credenciais corretas", async () => {
    const response = await server.post("/login").send({
      email: "cliente@gmail.com",
      senha: "234234",
    })

    expect(response.status).toBe(200) // Código 200 indica sucesso na autenticação
    expect(response.body).toHaveProperty("token") // Verifique se a resposta contém um token de autenticação
  })

  // Adicione mais testes conforme necessário
})
