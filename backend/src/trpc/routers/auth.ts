import { publicProcedure, router } from '../trpc';
import { loginSchema, registerSchema } from '../../modules/auth/dto/auth.dto';

export const authRouter = router({
    register: publicProcedure
        .input(registerSchema)
        .mutation(async ({ input, ctx }) => {
            return ctx.authService.register(input);
        }),

    login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ input, ctx }) => {
            return ctx.authService.login(input);
        }),
});
