import { createApp } from './app';
import { config } from './config';
import { initLoaders } from './loaders';
import { Logger } from './utils/logger';

const startServer = async () => {
    try {
        await initLoaders();

        const app = createApp();

        app.listen(config.port, () => {
            Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
      `);
        });
    } catch (error) {
        Logger.error('Error starting server', error);
        process.exit(1);
    }
};

startServer();
