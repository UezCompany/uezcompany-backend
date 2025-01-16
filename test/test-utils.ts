import app from "@/application/server"

// Função para login e retorno do token e user
export const login = async (email: string, password: string) => {
  const response = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: { email, password },
  })

  if (response.statusCode !== 200) {
    throw new Error(`Login falhou: ${response.statusCode}`)
  }

  const { token, user } = JSON.parse(response.body)
  return { token, user }
}
