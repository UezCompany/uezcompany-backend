import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import sendNotification from "@/utils/sendNotification"

export default async function Register(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const registerUzerBody = z.object({
      nome: z.string(),
      email: z.string().email(),
      senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
      cpf: z.string().regex(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/),
      dataNasc: z.string(),
      cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/),
      telefone: z.string(),
      logradouro: z.string().min(1, "O logradouro é obrigatório"),
      numero: z.string().min(1, "O número é obrigatório"),
      complemento: z.optional(z.string()),
      bairro: z.string().min(1, "O bairro é obrigatório"),
      cidade: z.string().min(1, "A cidade é obrigatória"),
      estado: z.string().min(1, "O estado é obrigatório"),
      idServico: z.optional(z.string()),
      usertype: z.enum(["UZER", "CLIENTE"]),
      username: z.string(),
    })

    const {
      nome,
      email,
      senha,
      cpf,
      dataNasc,
      cep,
      telefone,
      bairro,
      cidade,
      estado,
      logradouro,
      numero,
      complemento,
      idServico,
      usertype,
      username,
    } = registerUzerBody.parse(request.body)

    switch (usertype) {
      case "UZER": {
        const [
          prevUzerByEmail,
          prevUzerByCpf,
          prevUzerByTelefone,
          prevUzerByUsername,
        ] = await Promise.all([
          prisma.uzers.findUnique({ where: { email } }),
          prisma.uzers.findUnique({ where: { cpf } }),
          prisma.uzers.findFirst({ where: { telefone } }),
          prisma.uzers.findFirst({ where: { username } }),
        ])

        // Se algum dos campos já existe, retornar uma resposta adequada
        if (
          prevUzerByEmail ||
          prevUzerByCpf ||
          prevUzerByTelefone ||
          prevUzerByUsername
        ) {
          return reply.status(400).send({
            message:
              "Já existe um usuário com esse email, cpf, username ou telefone.",
          })
        }

        const servico = await prisma.servicos.findUnique({
          where: {
            id: idServico,
          },
        })

        if (!servico) {
          return reply.status(400).send({ message: "Servico inexistente." })
        }

        const newUzer = await prisma.uzers.create({
          data: {
            nome,
            email,
            bairro,
            cep,
            cidade,
            cpf,
            dataNascimento: dataNasc,
            estado,
            logradouro,
            numero: Number(numero),
            senha: bcrypt.hashSync(senha, 10),
            situacao: "ATIVO",
            tipoUsuario: usertype,
            telefone,
            complemento,
            username,
            servico: {
              connect: {
                id: idServico,
              },
            },
          },
        })

        if (!newUzer) {
          return reply.status(400).send({ message: "Erro ao cadastrar." })
        }

        await sendNotification(
          newUzer.id,
          `Seja bem-vindo(a) ${newUzer.nome}, ficamos muito felizes em ter você conosco!`,
          "parabens",
        )

        return reply
          .status(201)
          .send({ message: "Usuário criado com sucesso!" })
      }
      case "CLIENTE": {
        const [
          prevClienteByEmail,
          prevClienteByCpf,
          prevClienteByTelefone,
          prevClienteByUsername,
        ] = await Promise.all([
          prisma.clientes.findUnique({ where: { email } }),
          prisma.clientes.findUnique({ where: { cpf } }),
          prisma.clientes.findFirst({ where: { telefone } }),
          prisma.clientes.findFirst({ where: { username } }),
        ])

        // Se algum dos campos já existe, retornar uma resposta adequada
        if (
          prevClienteByEmail ||
          prevClienteByCpf ||
          prevClienteByTelefone ||
          prevClienteByUsername
        ) {
          return reply.status(400).send({
            message:
              "Já existe um usuário com esse email, cpf, username ou telefone.",
          })
        }

        const newCliente = await prisma.clientes.create({
          data: {
            nome,
            email,
            bairro,
            cep,
            cidade,
            cpf,
            dataNascimento: dataNasc,
            estado,
            logradouro,
            numero: Number(numero),
            senha: bcrypt.hashSync(senha, 10),
            situacao: "ATIVO",
            tipoUsuario: usertype,
            telefone,
            complemento,
            username,
          },
        })

        if (!newCliente) {
          return reply.status(400).send({ message: "Erro ao cadastrar." })
        }

        return reply
          .status(201)
          .send({ message: "Usuário criado com sucesso!" })
      }
      default: {
        return reply.status(400).send({
          message: "Tipo de usuário inválido.",
        })
      }
    }
  })
}
