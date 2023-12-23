import { NextApiRequest, NextApiResponse } from "next";
import { Playlist, Track } from "../../../models/media";
import prisma from "../../../prisma/client";
import { ResponseError } from "../../../models/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track[] | Playlist | ResponseError>
) {
  if (req.method === "GET") {
    const id = req.query.id as string;
    const pattern = req.query.pattern as string;

    try {
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
    } catch (err) {
      const response: ResponseError = {
        code: 500,
        message: err as string,
      };
      res.status(500).json(response);
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const userId = req.cookies["userId"];
    if (!userId) res.status(403).end();

    try {
      let playlist: Playlist = await prisma.playlist.findUniqueOrThrow({
        where: {
          id: id as string,
        },
      });
      if (playlist.id !== userId) {
        res.status(403).json([]);
      }

      await prisma.tracksOnPlaylists.deleteMany({
        where: {
          playlistId: id as string,
        },
      });

      playlist = await prisma.playlist.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json(playlist);
    } catch (err) {
      const response: ResponseError = {
        code: 500,
        message: err as string,
      };
      res.status(500).json(response);
    }
  }

  res.status(405).end();
}
