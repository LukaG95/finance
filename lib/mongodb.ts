import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { User } from "types/user";

const uri = process.env.MONGODB_URI!;
const options = { appName: "finance" };

declare global {
  // Allow global caching in dev mode
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export default clientPromise;

export async function getUser(email: string){
  const client = await clientPromise;
  const db = client.db('finance-test');
  return db.collection<User>("users").findOne({ email });
}

export async function createUser(email: string, password: string) {
  const client = await clientPromise;
  const db = client.db('finance-test');
  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.collection("users").insertOne({ email, password: hashedPassword }); 
}
