import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "next-auth/jwt";
import { Track } from "../../models/media";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Track[]>
) {
  const pattern = req.query.pattern as string;

  try {
    const tracks: Track[] = await prisma.track.findMany({
      where: {
        OR: [
          {
            name: { contains: pattern, mode: "insensitive" },
          },
          {
            genres: {
              some: {
                name: { contains: pattern, mode: "insensitive" },
              },
            },
          },
          {
            artists: {
              some: {
                name: { contains: pattern, mode: "insensitive" },
              },
            },
          },
        ],
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
    res.status(500).json([]);
  }
}
