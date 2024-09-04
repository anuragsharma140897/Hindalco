import { validationSchema } from "../utils/validation-schema";

export const addDeviceSchema = {
    mapperName: validationSchema?.string('Mapper Name Field is Required'),
    usedBy: validationSchema?.string('Used By is Required')
};
