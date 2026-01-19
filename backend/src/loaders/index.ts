import { connectDatabase } from './database';

export const initLoaders = async () => {
    await connectDatabase();
};
