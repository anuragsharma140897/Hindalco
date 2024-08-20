import { validationSchema } from "../../validationSchema";

export const locationMasterSchema = {
    value: validationSchema.string('Value is required'),
};
