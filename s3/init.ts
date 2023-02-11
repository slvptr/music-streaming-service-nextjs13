import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const aws = new S3Client({
  endpoint: process.env.YC_ENDPOINT,
  region: "ru-central1",
  credentials: {
    accessKeyId: process.env.YC_ACCESS_KEY as string,
    secretAccessKey: process.env.YC_SECRET_KEY as string,
  },
});

export const s3UploadFile = async (
  file: Buffer,
  path: string,
  filename: string
) => {
  const params = {
    Bucket: process.env.YC_BUCKET,
    Key: `${path}/${filename}`,
    Body: file,
    ContentType: "text/plain",
  };
  return aws.send(new PutObjectCommand(params));
};
