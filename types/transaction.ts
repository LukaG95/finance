import { ObjectId } from 'mongodb';

export type Transaction = {
  _id: string;
  sender: string;
  sender_id: ObjectId | null;
  receiver_id: ObjectId | null;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}; 