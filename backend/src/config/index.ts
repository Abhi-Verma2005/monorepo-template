import { env } from './env';

export const config = {
    env: env.NODE_ENV,
    port: env.PORT,
    db: {
        url: env.DATABASE_URL,
    },
    jwt: {
        secret: env.JWT_SECRET,
    },
};
