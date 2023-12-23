import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { Playlist, Track } from "../../../models/media";
import { ResponseError } from "../../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).end();
  }

  const { id } = req.query;

  const playlistId = req.query.playlistId as string;
  const userId = req.cookies["userId"];
  if (!userId) {
    res.status(403).end();
    return;
  }

  try {
    await prisma.tracksOnPlaylists.delete({
      where: {
        trackId_playlistId: {
          trackId: id as string,
          playlistId: playlistId,
        },
      },
    });

    res.status(200).end();
  } catch (err) {
    const response: ResponseError = {
      code: 500,
      message: err as string,
    };
    res.status(500).json(response);
  }
}
