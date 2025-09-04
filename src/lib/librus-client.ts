
import type { NextApiRequest } from "next";
import Librus from "librus-api";

// This function creates and authenticates a Librus client instance
// using credentials stored in a cookie.
export async function getAuthenticatedClient(req: NextApiRequest) {
  const cookie = req.cookies["auth-credentials"];
  if (!cookie) {
    return null;
  }

  try {
    const { username, password } = JSON.parse(cookie);
    if (!username || !password) {
      return null;
    }

    const client = new Librus();
    await client.authorize(username, password);
    return client;
  } catch (error) {
    console.error("Failed to authenticate Librus client from cookie:", error);
    return null;
  }
}
