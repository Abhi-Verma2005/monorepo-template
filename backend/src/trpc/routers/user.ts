import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { userUpdateSchema } from '../../modules/user/dto/user.dto';

export const userRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.userService.getAllUsers();
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return ctx.userService.getUserById(input.id);
        }),

    update: protectedProcedure
        .input(userUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            // Ensure the ID in input matches the authenticated user, or validate inside service
            // The service checks if (userId !== data.id), so we pass both.
            return ctx.userService.updateUser(ctx.user.userId, input);
        }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return ctx.userService.deleteUser(ctx.user.userId, input.id);
        }),
});
