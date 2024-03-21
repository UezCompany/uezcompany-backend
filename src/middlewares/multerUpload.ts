import multer from "multer"
import { Request } from "express"
import crypto from "crypto"

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

const uploadMiddleware = multer({ storage })

export default uploadMiddleware
