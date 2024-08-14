import { z } from 'zod';
import { siteMasterVariable } from '../../../../Constant/variables/master/site-master/site-master.variable';
import { GenerateMessage } from '../../../../config/message';

// form zod validation schema
export const siteMasterSchema = z.object({
    [siteMasterVariable?.siteName]: z.string().min(6, { message: GenerateMessage(siteMasterVariable?.siteName, ['required']) }),
    [siteMasterVariable?.buildings]: z.optional(z.string()),
    [siteMasterVariable?.area]: z.optional(z.string()),
});
