import { z } from 'zod';

export const loginBodySchema = z.object({
  email: z.string().email('O e-mail deve ser valido.'),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;
