import { z } from 'zod';

// form zod validation schema
export const addProduct = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
