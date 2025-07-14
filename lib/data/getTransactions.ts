import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { MinimalTransaction } from 'types/transaction';

export async function getTransactions(
  userId: ObjectId,
  category?: string,
  limit?: number
): Promise<MinimalTransaction[]> {
  const db = client.db();

  const query: any = { sender_id: userId };
  if (category) query.category = category;

  const cursor = db
    .collection<MinimalTransaction>('transactions')
    .find(query, {
      projection: { _id: 1, category: 1, amount: 1, date: 1, sender: 1 }
    })
    .sort({ date: -1 });

  if (limit) cursor.limit(limit);

  const raw = await cursor.toArray();
  return JSON.parse(JSON.stringify(raw));
}
