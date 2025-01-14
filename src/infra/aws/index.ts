import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { env } from "../../../env"

const bucketName = "uez-prod-images"

const region = env.AWS_REGION
const accessKeyId = env.AWS_ACCESS_KEY_ID
const secretAccessKey = env.AWS_SECRET_ACCESS_KEY
const sessionToken = env.AWS_SESSION_TOKEN

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  },
})

export const uploadImage = {
  upload: async (
    file: Buffer,
    key: string,
    contentType: string = "image/jpeg",
  ): Promise<string> => {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: "public-read", // Para permitir acesso público ao arquivo
    })

    try {
      await s3Client.send(command)
      console.log(`Upload successful for key: ${key}`)

      // Retorna a URL pública da imagem
      return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
    } catch (error) {
      console.error(`Upload failed for key: ${key}`, error)
      throw error
    }
  },

  profileImage: async (file: Buffer, filename: string): Promise<string> => {
    const key = `profile-images/${filename}`
    return uploadImage.upload(file, key)
  },

  bannerImage: async (file: Buffer, filename: string): Promise<string> => {
    const key = `banner-images/${filename}`
    return uploadImage.upload(file, key)
  },
}
