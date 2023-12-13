import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

type RegisterBody = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  res.setHeader("Content-Type", "application/json");
  const { username, password } = req.body as RegisterBody;

  if (!username || !password) {
    res.status(400).json({
      message: "username and password must not be empty",
    });
  }

  if (username.length <= 3) {
    res.status(400).json({
      message: "username length must be > 3",
    });
  }

  if (password.length <= 5) {
    res.status(400).json({
      message: "password length must be > 5",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      res.status(400).json({
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      id: createdUser.id,
      username: createdUser.username,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}
