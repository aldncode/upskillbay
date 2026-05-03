import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(6, 'Min 6 chars')
    .regex(/[A-Z]/, '1 uppercase required')
    .regex(/[0-9]/, '1 number required'),
});

export const signupSchema = authSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
});

export function getZodErrorMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? 'Invalid request';
}
