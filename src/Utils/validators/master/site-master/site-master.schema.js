import { validationSchema } from "../../validationSchema";

export const siteMasterSchema = {
    siteName: validationSchema.string('Role Name Field will be number')
        .min(6, 'Role Name Field should be min 6 characters long'),

};
