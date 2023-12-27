import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { ResponseError } from "../../../models/response";
import { decode } from "next-auth/jwt";
import { NextResponse } from "next/server";

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

    const sessionToken = req.cookies["next-auth.session-token"];

    const jwt = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    // @ts-ignore
    if (!jwt && !jwt?.user?.id) {
      return NextResponse.json({ message: "unauthorised" }, { status: 401 });
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
        // @ts-ignore
        userId: jwt.user.id,
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
    const response: ResponseError = {
      code: 500,
      message: error as string,
    };
    res.status(500).json(response);
  }
}
