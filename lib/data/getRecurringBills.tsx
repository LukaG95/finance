import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
// import bill type

export async function getBills(userId: ObjectId, filter?, sortQuery? ) {
  const db = client.db(); 

  const raw = await db.collection('recurring_bills')
    .find({userId: userId, ...filter })
    .sort(sortQuery)
    .toArray();

  return JSON.parse(JSON.stringify(raw));
}
