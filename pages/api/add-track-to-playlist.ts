import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const trackId = req.query.trackId as string;
  const playlistId = req.query.playlistId as string;

  await prisma.tracksOnPlaylists.create({
    data: {
      trackId: trackId,
      playlistId: playlistId,
    },
  });

  res.status(200).end();
}
