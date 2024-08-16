import { z } from 'zod';

// form zod validation schema
export const rolesAndPermissionSchema = z.object({
    roleName: z.string().min(1),
});
