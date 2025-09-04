
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Remove the authentication cookie
  const cookie = serialize("auth-credentials", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    expires: new Date(0),
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ success: true });
}
