import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;
  try {
    const jwt = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!jwt) {
      return NextResponse.json({ message: "unauthorised" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "invalid authorities" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/((?!auth).*)",
};
