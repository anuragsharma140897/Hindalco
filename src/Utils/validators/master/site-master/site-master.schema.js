import { validationSchema } from "../../validationSchema";

export const siteMasterSchema = {
    siteName: validationSchema.string('Site Name Field is Required')
        .min(6, 'Site Name Field should be min 6 characters long'),

};
