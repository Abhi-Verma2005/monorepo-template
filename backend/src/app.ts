import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/context';
import { config } from './config';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', env: config.env });
    });

    app.use(
        '/trpc',
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    );

    return app;
};
