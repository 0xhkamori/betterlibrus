
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedClient } from "@/lib/librus-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await getAuthenticatedClient(req);
    if (!client) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountInfo = await client.info.getAccountInfo();
    return res.status(200).json({ success: true, user: { email: accountInfo.login } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "An error occurred." });
  }
}
