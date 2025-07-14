import { ObjectId } from 'mongodb';
import { MinimalTransaction } from './transaction';

export type Budget = {
  _id: string;
  userId: ObjectId;
  category: string;
  theme: string;
  amount: number;
  createdAt: string;
}; 

export type MinimalBudget = {
  _id: string;
  category: string;
  theme: string;
  amount: number;
};

export type BudgetSummary = {
  _id: string;
  category: string;
  theme: string;
  amount: number;
  spent: number;
  remaining: number;
  transactions: MinimalTransaction[];
};