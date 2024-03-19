import { z } from 'zod';
import { User } from 'entities/User';

export const signUpSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: 'Имя пользователя слишком короткое' })
            .max(20, 'Имя пользователя слишком длинное')
            .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
        email: z.string().email('Некорректный email'),
        password: z.string().min(6, 'Пароль слишком короткий'),
        confirmPassword: z.string().min(6, 'Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Введенные пароли не совпадают',
    });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export interface SignUpByEmailSchema {
    data?: SignUpSchema;
    isLoading: boolean;
    error?: string;
}
