import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { Track } from "../../../models/media";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    const reqName = req.query.name as string;
    const reqArtist = req.query.artist as string;
    const reqGenre = req.query.genre as string;
    const reqCoverId = req.query.coverId as string;
    const reqTrackId = req.query.trackId as string;
    const reqPlaylistId = req.query.playlistId as string;

    const userId = req.cookies["userId"];
    if (!userId) {
      res.status(403).end();
      return;
    }

    const trackAssignment = await prisma.track.create({
      data: {
        name: reqName,
        coverUrl: `${process.env.YC_ENDPOINT}/${process.env.YC_BUCKET}/${process.env.YC_TRACKS_COVERS_PATH}/${reqCoverId}`,
        trackUrl: `${process.env.YC_ENDPOINT}/${process.env.YC_BUCKET}/${process.env.YC_TRACKS_PATH}/${reqTrackId}`,
        artists: {
          create: {
            name: reqArtist,
          },
        },
        genres: {
          create: {
            name: reqGenre,
          },
        },
        userId: userId,
      },
    });

    await prisma.tracksOnPlaylists.create({
      data: {
        trackId: trackAssignment.id,
        playlistId: reqPlaylistId,
      },
    });

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
