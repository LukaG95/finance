import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { MinimalBudget } from 'types/budget';

export async function getBudgets(userId: ObjectId) {
  const db = client.db();
  const raw = await db
    .collection<MinimalBudget>('budgets')
    .find({ userId }, { projection: {_id: 1, category: 1, theme: 1, amount: 1 } })
    .toArray();

  return JSON.parse(JSON.stringify(raw));
}
