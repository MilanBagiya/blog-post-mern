import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './middleware/logger';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/blogDB';

const connectToMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URL, {});
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const initServer = (): void => {
    // Middleware
    app.use(express.json());
    app.use(logger);

    // CORS Headers
    app.use((req: Request, res: Response, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
            return res.status(200).json({});
        }
        next();
    });

    app.use('/api/posts', postRoutes);

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello Blog-API is Working!');
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
        console.log('Server is shutting down...');
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
};

const startApp = async (): Promise<void> => {
    await connectToMongoDB();
    initServer();
};

// Start the application
startApp().catch((error) => {
    console.error('Failed to start app:', error);
    process.exit(1);
});