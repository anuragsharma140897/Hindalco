import { validationSchema } from "../../validationSchema";

export const generalMasterSchema = {
    value: validationSchema.string('Value is required'),
    status: validationSchema.string('Status is required'),
    usedBy: validationSchema.string('Used By is required'),
   
};
