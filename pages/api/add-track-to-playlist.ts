import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { ResponseError } from "../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const trackId = req.query.trackId as string;
  const playlistId = req.query.playlistId as string;

  try {
    await prisma.tracksOnPlaylists.create({
      data: {
        trackId: trackId,
        playlistId: playlistId,
      },
    });
    res.status(200).json({
      playlistId,
      trackId,
    });
  } catch (err) {
    const response: ResponseError = {
      code: 500,
    };
    res.status(500).json(response);
  }
}
