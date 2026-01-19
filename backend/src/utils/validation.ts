import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const userUpdateSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
});
