import { z } from 'zod';

// form zod validation schema
export const siteMasterSchema = z.object({
    siteName: z.string().min(6, {message:'Site Name is Required'})
});
