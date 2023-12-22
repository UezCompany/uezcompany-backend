import express from "express"
import multer from "multer"
import uzerController from "../controllers/Uzer"
import S3 from "../aws"
import fs from "fs"
import crypto from "crypto"
import { Request } from "express"

const router = express.Router()

import validateJWT from "../middlewares/validateJWT"

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "uploads/")
  },
  filename: function (req: Request, file: any, cb: any) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo =
      file.originalname.split(".")[file.originalname.split(".").length - 1]

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = crypto.randomBytes(16).toString("hex")

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  },
})

const upload = multer({ storage })

const uploadImageToS3 = async (
  filePath: any,
  fileName: any,
  bucketName: any,
) => {
  const imageBuffer = fs.readFileSync(filePath)
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: imageBuffer,
    ACL: "public-read", // Define as permissões para a imagem
  }

  try {
    const data = await S3.upload(params).promise()
    return data.Location // A URL pública da imagem no S3
  } catch (error) {
    console.error("Erro ao fazer upload da imagem no S3:", error)
    throw error
  }
}

router.get("/uzers", uzerController.getAllUzers)
router.get("/uzers/:id", uzerController.getUzerById)

router.put("/uzers/:id", validateJWT, uzerController.updateUzer)
router.post(
  "/uzers/profilephoto",
  upload.single("profilephoto"),
  validateJWT,
  async (req, res, next) => {
    const filePath = req.file?.path
    const fileName = req.file?.originalname
    const bucketName = "uezcompanys3"

    try {
      const imageUrl = await uploadImageToS3(filePath, fileName, bucketName)
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
router.delete("/uzers/:id", validateJWT, uzerController.deleteUzer)

export default router
