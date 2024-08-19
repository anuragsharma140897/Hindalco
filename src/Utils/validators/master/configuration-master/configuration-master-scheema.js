import { validationSchema } from "../../validationSchema";

export const configurationMasterSchema = {
    name: validationSchema.string('Name is required'),
    type: validationSchema.string('Type is required'),
    description: validationSchema.string('Description By is required'),
    managementEventsTopic : validationSchema.string('Topic By is required'),
   
};
