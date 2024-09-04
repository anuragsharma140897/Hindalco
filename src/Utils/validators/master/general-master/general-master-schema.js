import { validationSchema } from "../../validationSchema";

export const generalMasterSchema = {
    value: validationSchema.string('Value is required'),
    label: validationSchema.string('Label is required'),
    usedBy: validationSchema.string('Used By is required'),
   
};
