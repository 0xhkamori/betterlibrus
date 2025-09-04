
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Librus from "librus-api";
import { serialize } from "cookie";

type Data = {
  success: boolean;
  message?: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  const client = new Librus();

  try {
    const isAuthorized = await client.authorize(username, password);
    
    if (!isAuthorized) {
        // This case should ideally not be hit if authorize throws, but as a safeguard:
        return res.status(401).json({ success: false, message: 'Invalid credentials. Please try again.' });
    }

    const accountInfo = await client.info.getAccountInfo();

    const userCookie = { username, password };
    const cookie = serialize("auth-credentials", JSON.stringify(userCookie), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    res.setHeader("Set-Cookie", cookie);

    res.status(200).json({ success: true, user: accountInfo });
  } catch (error) {
    console.error('🔥 Login failed');
    if (error instanceof Error) {
        // Explicitly check for authorization-related errors from librus-api
        if (error.message.toLowerCase().includes('authorization failed')) {
            return res.status(401).json({ success: false, message: 'Invalid credentials. Please try again.' });
        }
    }
    // For any other kind of error, return a generic 500
    res.status(500).json({ success: false, message: "An unexpected error occurred during login." });
  }
}
