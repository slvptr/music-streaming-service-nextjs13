import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { Playlist, Track } from "../../../models/media";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    const playlistId = req.query.playlistId as string;
    const userId = req.cookies["userId"];
    if (!userId) {
      res.status(403).end();
      return;
    }

    await prisma.tracksOnPlaylists.delete({
      where: {
        trackId_playlistId: {
          trackId: id as string,
          playlistId: playlistId,
        },
      },
    });

    res.status(200).end();
  }

  res.status(405).end();
}
