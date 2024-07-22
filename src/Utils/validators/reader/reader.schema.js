
import { z } from 'zod';

// form zod validation schema
export const readerSchema = z.object({
  placement: z.string().min(1),
  readerType: z.number(),
  readerAction: z.string().min(1),
  status: z.string().min(1),
  builingDetails: z.string().min(1),
  zone: z.string().min(1),
  frequency: z.string().min(1),
  readerInfo: z.string().min(1),
  serialNo: z.string().min(1),
  macId: z.string().min(1),
});
