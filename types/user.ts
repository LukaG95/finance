import { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  id: string;
  email: string;
  password: string;
  name?: string;
};