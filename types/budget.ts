import { ObjectId } from 'mongodb';
import { Transaction } from './transaction';

export type Budget = {
  _id: string;
  userId: ObjectId;
  category: string;
  theme: string;
  amount: number;
  createdAt: string;
}; 

export interface BudgetSummary extends Budget {
  spent: number;
  remaining: number;
  transactions: Transaction[];
}