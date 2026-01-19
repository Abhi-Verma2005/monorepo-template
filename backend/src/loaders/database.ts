import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';

const prisma = new PrismaClient();

export const connectDatabase = async () => {
    try {
        await prisma.$connect();
        Logger.info('✅ Database connected successfully');
    } catch (error) {
        Logger.error('❌ Database connection failed', error);
        process.exit(1);
    }
};

export default prisma;
