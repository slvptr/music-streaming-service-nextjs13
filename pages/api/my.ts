import type { NextApiRequest, NextApiResponse } from "next";
import { Playlist } from "../../models/media";
import prisma from "../../prisma/client";
import { ResponseError } from "../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist[]>
) {
  const userId = req.query.userId as string;
  const pattern = req.query.pattern as string;

  try {
    const myPlaylists: Playlist[] = await prisma.playlist.findMany({
      where: {
        user: {
          id: userId,
        },
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

    res.status(200).json(myPlaylists);
  } catch (err) {
    res.status(500).json([]);
  }
}
