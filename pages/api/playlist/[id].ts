import { NextApiRequest, NextApiResponse } from "next";
import { Playlist, Track } from "../../../models/media";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track[]>
) {
  if (req.method === "GET") {
    const id = req.query.id as string;
    const pattern = req.query.pattern as string;

    const tracks: Track[] = await prisma.track.findMany({
      where: {
        playlists: {
          some: {
            playlistId: id,
          },
        },
        name: {
          contains: pattern,
          mode: "insensitive",
        },
      },
      include: {
        artists: {
          select: {
            name: true,
          },
        },
        genres: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json(tracks);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const userId = req.cookies["userId"];
    if (!userId) res.status(403).end();

    try {
      const playlist: Playlist = await prisma.playlist.findUniqueOrThrow({
        where: {
          id: id as string,
        },
      });
      if (playlist.userId !== userId) throw new Error();
    } catch (error) {
      console.log(error);
      res.status(403).end();
    }

    await prisma.tracksOnPlaylists.deleteMany({
      where: {
        playlistId: id as string,
      },
    });

    await prisma.playlist.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).end();
  }

  res.status(405).end();
}
