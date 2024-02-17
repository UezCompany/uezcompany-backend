import express from "express"
const router = express.Router()
import servicoController from "../controllers/Servico"
import validateMiddlewares from "../middlewares/validate"
import authMiddleware from "../middlewares/authMiddleware"

const categorias = [
  { nomeCategoria: "Design" },
  { nomeCategoria: "Desenvolvimento de Software" },
  { nomeCategoria: "Marketing" },
  { nomeCategoria: "Consultoria" },
  { nomeCategoria: "Serviços de TI" },
  { nomeCategoria: "Educação" },
  { nomeCategoria: "Saúde e Bem-estar" },
  { nomeCategoria: "Manutenção e Reparos" },
  { nomeCategoria: "Serviços Domésticos" },
  { nomeCategoria: "Eventos" },
]

router.get("/servicos", servicoController.getAllServicos)
router.get("/servicosPorCategoria", servicoController.getServicoByCategoryName)
router.get("/servicos/:id", servicoController.getServicoById)
router.get("/categorias", (req, res) => {
  res.status(200).json(categorias)
})

router.use(authMiddleware)

router.post(
  "/servicos",
  validateMiddlewares.validateCreateServicoBody,
  servicoController.createServico,
)

router.delete("/servicos/:id", servicoController.deleteServico)
// Outras rotas para o modelo de Cliente

export default router
