import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { User } from "../../../models/account";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const sessionToken = req.headers.sessiontoken as string;

  const userSession = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });
  if (!userSession) {
    res.status(403).end();
    return;
  }

  const user: User | null = await prisma.user.findFirst({
    where: {
      id: userSession.userId,
    },
  });
  if (!user) {
    res.status(404).end();
    return;
  }

  res.status(200).json(user);
}
