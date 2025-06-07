/* import { MongoClient } from "mongodb";
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
 */


import bcrypt from "bcryptjs";
import { User } from "types/user";
import { MongoClient, ServerApiVersion } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  var globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
export default client

export async function getUser(email: string) {
  const db = client.db('finance-test');
  return db.collection<User>("users").findOne({ email });
}

export async function createUser(email: string, password: string) {
  const db = client.db('finance-test');
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.collection("users").insertOne({ email, password: hashedPassword });
}
