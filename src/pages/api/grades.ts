
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedClient } from "@/lib/librus-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await getAuthenticatedClient(req);
    if (!client) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const grades = await client.info.getGrades();
    return res.status(200).json(grades);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "An error occurred." });
  }
}
