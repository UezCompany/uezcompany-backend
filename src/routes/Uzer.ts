import express from "express"
import uzerController from "../controllers/Uzer"
import { uploadImageToS3 } from "../aws"
import fs from "fs"
import uploadMiddleware from "@/middlewares/multerUpload"

const router = express.Router()

router.get("/uzers", uzerController.getAllUzers)
router.get("/uzers/:id", uzerController.getUzerById)

router.put("/uzers/:id", uzerController.updateUzer)
router.post(
  "/uzers/profilephoto",
  uploadMiddleware.single("profilephoto"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo obrigatório" })
    }
    const filePath = req.file.path

    const file = new File([req.file.buffer], req.file.originalname)
    try {
      // Passe o arquivo (req.file) para a função uploadImageToS3
      const imageUrl = await uploadImageToS3(file)

      req.body.photoUrl = imageUrl

      // Excluir o arquivo local após o upload no S3
      fs.unlink(filePath || "", (err) => {
        if (err) {
          console.error("Erro ao excluir o arquivo local:", err)
        } else {
          console.log("Arquivo local excluído com sucesso.")
        }
      })

      next()
    } catch (error) {
      console.error("Erro ao fazer upload da imagem no S3:", error)
      res.status(500).json({ error: "Erro ao fazer upload da imagem no S3" })
    }
  },
  uzerController.updateUzerPhoto,
)
router.delete("/uzers/:id", uzerController.deleteUzer)

export default router
