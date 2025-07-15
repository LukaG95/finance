import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Pot } from 'types/pot';

export async function getPots(userId: ObjectId) {
  const db = client.db();
  const raw = await db
    .collection<Pot>('pots')
    .find({ userId }, { projection: {_id: 1, name: 1, theme: 1, amount: 1, saved: 1 } })
    .toArray();

  return JSON.parse(JSON.stringify(raw));
}
