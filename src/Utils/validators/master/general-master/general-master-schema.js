import { validationSchema } from "../../validationSchema";

export const generalMasterSchema = {
    value: validationSchema.string('Value is required'),
    fieldName: validationSchema.string('Field name is required'),
    usedBy: validationSchema.string('Used By is required'),
   
};
