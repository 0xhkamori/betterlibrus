
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

    const absences = await client.absence.getAbsences();
    return res.status(200).json(absences);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "An error occurred." });
  }
}
