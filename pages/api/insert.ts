import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = client.db("finance-test"); // or your actual DB name
    const result = await db.collection("data").insertOne({
      name: "User",
      createdAt: new Date(),
    });

    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Insert failed", details: err });
  }
}
