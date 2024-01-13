import servicoModel from "../models/Servico"
import { Request, Response } from "express"

const ServicoController = {
  getAllServicos: async (req: Request, res: Response) => {
    try {
      const servicos = await servicoModel.getAllServicos()
      res.status(200).json(servicos)
    } catch (error: any) {
      console.error("Erro ao obter servicos: " + error.stack)
      res.status(500).json({ message: "Erro ao obter servicos" })
    }
  },
  getServicoById: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const servico = await servicoModel.getServicoById(id)
      if (servico) {
        res.status(200).json(servico)
      } else {
        res.status(404).json({ message: "Servico não encontrado" })
      }
    } catch (error: any) {
      console.error("Erro ao obter servico por ID: " + error.stack)
      res.status(500).json({ message: "Erro ao obter servico por ID" })
    }
  },
  getServicoByCategoryName: async (req: Request, res: Response) => {
    const { categoria } = req.query
    try {
      const servico = await servicoModel.getServicoByCategory(String(categoria))
      if (servico && servico.length > 0) {
        return res.status(200).json(servico)
      } else {
        return res.status(404).json({
          message:
            "Categoria não encontrada. Consulte as categorias disponíveis para consulta.",
        })
      }
    } catch (error: any) {
      console.error("Erro ao obter servico por categoria: " + error.stack)
      res.status(500).json({ message: "Erro ao obter servico por categoria" })
    }
  },
  getCategoryByServicoName: async (req: Request, res: Response) => {
    const { servico } = req.query
    try {
      const category = await servicoModel.getCategoryByServico(String(servico))
      if (category && category.length > 0) {
        return res.status(200).json(category)
      } else {
        return res.status(404).json({
          message:
            "Categoria não encontrada. Consulte as categorias disponíveis para consulta.",
        })
      }
    } catch (error: any) {
      console.error("Erro ao obter a categoria por serviço: " + error.stack)
      res.status(500).json({ message: "Erro ao obter a categoria por servico" })
    }
  },
  createServico: async (req: Request, res: Response) => {
    const { nome } = req.body
    try {
      // Verifica se o servico já existe com base no nome
      const existingServico = await servicoModel.getServicoByName(nome)
      console.log(existingServico)
      if (existingServico) {
        return res
          .status(400)
          .json({ message: "Ja existe um servico com este nome" })
      }

      const servico = await servicoModel.createServico(req.body)
      if (servico.errors) {
        return res.status(400).json(servico.errors)
      }
      console.log(servico)
      res.status(200).json({ message: "Servico criado com sucesso", servico })
    } catch (error: any) {
      console.error("Erro ao criar servico: " + error.stack)
      res.status(500).json({ message: "Erro ao criar servico" })
    }
  },
  deleteServico: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const servico = await servicoModel.deleteServico(id)
      res.status(200).json(servico)
    } catch (error: any) {
      console.error("Erro ao deletar servico: " + error.stack)
      res.status(500).json({ message: "Erro ao deletar servico" })
    }
  },
}

export default ServicoController
