import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import { s3UploadFile } from "../../s3/init";
import { ResponseError } from "../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") res.status(405).end();

  const reqPath = req.query.path as string;
  const reqFileId = req.query.fileId as string;
  const buffer = await getRawBody(req);

  const responseLimitError: ResponseError = {
    code: 400,
    message: "file size limit exceeded",
  };

  if (reqPath.includes("covers") && buffer.length / 1024 / 1024 > 1) {
    res.status(400).json(responseLimitError);
  }

  if (reqPath === "tracks" && buffer.length / 1024 / 1024 > 15) {
    res.status(400).json(responseLimitError);
  }

  try {
    await s3UploadFile(buffer, reqPath, reqFileId);
    res.status(200).end();
  } catch (err) {
    const response: ResponseError = {
      code: 500,
      message: err as string,
    };
    res.status(500).json(response);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
