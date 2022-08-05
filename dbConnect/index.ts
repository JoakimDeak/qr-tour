import { Db, MongoClient } from 'mongodb';

let uri: string | undefined = process.env.MONGODB_URI;
let dbName: string | undefined = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
  throw new Error('No MONGODB_URI set');
}

if (!dbName) {
  throw new Error('No MONGODB_DB set');
}

export default async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri ?? '');

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
