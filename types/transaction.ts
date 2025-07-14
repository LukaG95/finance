import { ObjectId } from 'mongodb';

export type Transaction = {
  _id: ObjectId;
  sender: string;
  sender_id: ObjectId | null;
  receiver_id: ObjectId | null;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
}; 

export type MinimalTransaction = {
  _id: string;
  category: string;
  amount: number;
  sender: string;
  name: string;
  date: string;
};