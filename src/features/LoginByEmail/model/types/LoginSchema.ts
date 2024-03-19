import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль слишком короткий'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export interface LoginByEmailSchema {
    isLoading: boolean;
    error?: string;
}
