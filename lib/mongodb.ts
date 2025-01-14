import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'luna_skin_db'; // Default database name

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Using cached MongoDB connection.'); // Debug: Using cached connection
    return { client: cachedClient, db: cachedDb };
  }

  console.log('Attempting to connect to MongoDB...'); // Debug: Initiating connection
  const client = new MongoClient(uri!);
  await client.connect();
  console.log('Successfully connected to MongoDB client.'); // Debug: Client connected

  const db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`); // Debug: Database selected

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
