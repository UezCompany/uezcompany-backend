import request from "supertest"
import app from "./server"

// Testes
describe("Testes para o servidor", () => {
  it('Deve retornar "Server is running" ao acessar a rota raiz', async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(200)
    expect(response.body).toBe("Server is running")
  })

  // Adicione mais testes conforme necessário
})
