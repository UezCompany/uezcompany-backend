import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { env } from "../env"

const region = env.AWS_REGION
const bucketName = "uezcompanys3"
const accessKeyId = env.AWS_ACCESS_KEY_ID || "your-access-key-id"
const secretAccessKey = env.AWS_SECRET_ACCESS_KEY || "your-secret-access-key"
const sessionToken = env.AWS_SESSION_TOKEN || "your-session-token" // Opcional

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  },
})

export async function uploadImageToS3(file: File | undefined): Promise<string> {
  if (file === undefined) {
    throw new Error("File is undefined")
  }
  const key = `${Date.now()}-${file.name}`
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  return `https://${bucketName}.s3.amazonaws.com/${key}`
}

export async function getSignedUrlForImage(key: string): Promise<string> {
  const params = {
    Bucket: bucketName,
    Key: key,
  }

  const command = new GetObjectCommand(params)
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return url
}
