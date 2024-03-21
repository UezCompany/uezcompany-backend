import ClienteModel from "../models/Cliente"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

const ClienteController = {
  getAllClientes: async (req: Request, res: Response) => {
    try {
      const clientes = await ClienteModel.getAllClientes()
      res.status(200).json(clientes)
    } catch (error: any) {
      console.error("Erro ao obter clientes: " + error.stack)
      res.status(500).json({ message: "Erro ao obter clientes" })
    }
  },
  getClienteById: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const cliente = await ClienteModel.getClienteById(id)
      if (cliente) {
        res.json(cliente)
      } else {
        res.status(404).json({ message: "Cliente não encontrado" })
      }
    } catch (error: any) {
      console.error("Erro ao obter cliente por ID: " + error.stack)
      res.status(500).json({ message: "Erro ao obter cliente por ID" })
    }
  },
  createCliente: async (req: Request, res: Response) => {
    const { email, senha, CPF } = req.body
    try {
      // Verifica se o cliente já existe com base no email
      const existingCliente = await ClienteModel.getClienteByEmail(email)
      if (existingCliente) {
        return res
          .status(400)
          .json({ message: "Já existe um cliente com este email" })
      }

      // Verifica se o cliente já existe com base no CPF
      const existingClienteCPF = await ClienteModel.getClienteByCpf(CPF)
      if (existingClienteCPF) {
        return res
          .status(400)
          .json({ message: "Já existe um cliente com este CPF" })
      }

      const saltRounds = 10

      const hash = await bcrypt.hash(senha, saltRounds)
      req.body.senha = hash

      const cliente = await ClienteModel.createCliente(req.body)

      if (!cliente) {
        return res.status(400).json({ message: "Erro ao criar cliente" })
      }

      res.status(201).json({ message: "Cliente criado com sucesso", cliente })
    } catch (error: any) {
      console.error("Erro ao criar cliente: " + error.stack)
      res.status(500).json({ message: "Erro ao criar cliente" })
    }
  },

  updateCliente: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const cliente = await ClienteModel.updateCliente(id, req.body)
      res.status(200).json(cliente)
    } catch (error: any) {
      console.error("Erro ao atualizar cliente: " + error.stack)
      res.status(500).json({ message: "Erro ao atualizar cliente" })
    }
  },
  updateClientePhoto: async (req: Request, res: Response) => {
    const { photoUrl } = req.body

    try {
      const cliente = await ClienteModel.updateCliente(
        req.body.userId,
        req.body,
      )
      res.status(200).json({
        message: "Imagem de perfil atualizada com sucesso",
        cliente,
        photoUrl,
      })
    } catch (error: any) {
      console.error("Erro ao atualizar cliente: " + error.stack)
      res.status(500).json({ message: "Erro ao atualizar cliente" })
    }
  },
  deleteCliente: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const cliente = await ClienteModel.deleteCliente(id)
      res.status(200).json(cliente)
    } catch (error: any) {
      console.error("Erro ao deletar cliente: " + error.stack)
      res.status(500).json({ message: "Erro ao deletar cliente" })
    }
  },
}

export default ClienteController
