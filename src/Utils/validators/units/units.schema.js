import { z } from 'zod';

// form zod validation schema
export const unitSchema = z.object({
  unitName: z.string().min(1),
  noOfBuildings: z.number()
});
