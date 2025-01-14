import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { env } from "../../../env"

const bucketName = "uezcompany-prod-images"

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
  profileImage: async (file: Buffer, filename: string) => {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: file,
      ContentType: "image/jpeg",
      ACL: "public-read",
    })

    return s3Client.send(command)
  },
  bannerImage: async (file: Buffer, filename: string) => {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: file,
      ContentType: "image/jpeg",
      ACL: "public-read",
    })

    return s3Client.send(command)
  },
}
