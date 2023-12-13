import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import { s3UploadFile } from "../../s3/init";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") res.status(405).end();

  const reqPath = req.query.path as string;
  const reqFileId = req.query.fileId as string;
  const buffer = await getRawBody(req);

  if (reqPath.includes("covers") && buffer.length / 1024 / 1024 > 1) {
    res.status(400).json({
      message: "Превышен лимит по размеру",
    });
  }

  if (reqPath === "tracks" && buffer.length / 1024 / 1024 > 15) {
    res.status(400).json({
      message: "Превышен лимит по размеру",
    });
  }

  await s3UploadFile(buffer, reqPath, reqFileId);

  res.status(200).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
