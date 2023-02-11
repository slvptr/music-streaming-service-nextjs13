import type { NextApiRequest, NextApiResponse } from "next";
import { Playlist, Track } from "../../models/media";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist[]>
) {
  const pattern = req.query.pattern as string;

  const playlists: Playlist[] = await prisma.playlist.findMany({
    where: {
      OR: [
        {
          name: {
            contains: pattern,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: pattern,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.status(200).json(playlists);
}
