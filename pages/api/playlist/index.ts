import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { ResponseError } from "../../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const reqName = req.query.name as string;
  const reqDescription = req.query.description as string;
  const reqUserId = req.query.userId as string;
  const reqCoverId = req.query.coverId as string;

  try {
    const playlist = await prisma.playlist.create({
      data: {
        name: reqName,
        description: reqDescription,
        userId: reqUserId,
        coverUrl: `${process.env.YC_ENDPOINT}/${process.env.YC_BUCKET}/${process.env.YC_PLAYLIST_COVERS_PATH}/${reqCoverId}`,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    const response: ResponseError = {
      code: 500,
      message: error as string,
    };
    res.status(500).json(response);
  }
}
