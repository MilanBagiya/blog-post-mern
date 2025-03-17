import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'blogDB';
const client = new MongoClient(mongoUrl);

let db: Db | null = null;

export const connectToMongoDB = async (): Promise<void> => {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export const getDb = (): Db => {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
};

export const closeMongoDB = async (): Promise<void> => {
    try {
        await client.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
    }
};