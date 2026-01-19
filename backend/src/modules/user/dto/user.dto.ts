import { z } from 'zod';

export const userUpdateSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
});

export type UserUpdateDto = z.infer<typeof userUpdateSchema>;
