import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  gender : z.string().min(1),
  userType : z.string().optional(),
  access : z.string().optional(),
  
});
