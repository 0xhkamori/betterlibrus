
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedClient } from "@/lib/librus-client";

// Note: librus-api does not have a dedicated "exams" endpoint.
// We will fetch calendar events and filter for exams/tests.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await getAuthenticatedClient(req);
    if (!client) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const calendar = await client.calendar.getCalendar();
    
    // This is a sample filtering logic. It might need adjustment based on real data.
    const examEvents = Object.values(calendar).flat().filter(event => 
        event.title.toLowerCase().includes('sprawdzian') || 
        event.title.toLowerCase().includes('kartkówka') ||
        event.title.toLowerCase().includes('test')
    );

    return res.status(200).json(examEvents);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "An error occurred." });
  }
}
