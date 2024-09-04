import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  userName: z.string().min(6, {message:'Username is Required'}),
  password: z.string().min(6, {message:'Password is Required'}),
});
