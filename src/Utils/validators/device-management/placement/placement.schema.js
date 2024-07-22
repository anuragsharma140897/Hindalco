
import { z } from 'zod';

// form zod validation schema
export const placementSchema = z.object({
  placement: z.string().min(1),
  status: z.number(),
});
