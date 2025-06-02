import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = client.db("finance-test");
    const docs = await db.collection("data").find({}).toArray();

    res.status(200).json({ documents: docs });
  } catch (err) {
    res.status(500).json({ error: "Read failed", details: err });
  }
}
