import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { verifyToken } from '../utils/jwt';
import prisma from '../loaders/database';
import { AuthRepository } from '../modules/auth/auth.repository';
import { AuthService } from '../modules/auth/auth.service';
import { UserRepository } from '../modules/user/user.repository';
import { UserService } from '../modules/user/user.service';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? verifyToken(token) : null;

    const authRepository = new AuthRepository(prisma);
    const authService = new AuthService(authRepository);

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    return {
        req,
        res,
        prisma,
        user,
        authService,
        userService,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;
