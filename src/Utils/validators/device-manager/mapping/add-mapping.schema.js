import { validationSchema } from "../../validationSchema";

export const addMappingSchema = {
    mapperName: validationSchema.string('Maper Name Field is Required')
        .min(6, 'Maper Name Field should be min 6 characters long'),
        useFor: validationSchema.string('Use For Field is Required')

};
