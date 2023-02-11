import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    const reqName = req.query.name as string;
    const reqDescription = req.query.description as string;
    const reqUserId = req.query.userId as string;
    const reqCoverId = req.query.coverId as string;

    await prisma.playlist.create({
      data: {
        name: reqName,
        description: reqDescription,
        userId: reqUserId,
        coverUrl: `${process.env.YC_ENDPOINT}/${process.env.YC_BUCKET}/${process.env.YC_PLAYLIST_COVERS_PATH}/${reqCoverId}`,
      },
    });

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
