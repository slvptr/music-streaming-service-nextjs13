import type { NextApiRequest, NextApiResponse } from "next";
import { Playlist } from "../../../../models/media";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist>
) {
  const { id } = req.query;
  const playlist: Playlist | null = await prisma.playlist.findFirst({
    where: {
      id: id as string,
    },
  });
  if (!playlist) {
    res.status(400).end();
    return;
  }

  res.status(200).json(playlist);
}
