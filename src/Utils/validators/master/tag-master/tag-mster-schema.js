import { validationSchema } from "../../validationSchema";

export const tagMasterSchema = {
    tagNumber: validationSchema.string('Tag Number Maker is required'),
    tagPlacement: validationSchema.string('Tag Placement Model is required'),
    tagUsedFor: validationSchema.string('Tag Used For Year is required'),
    status: validationSchema.string('Status Type is required'),
   
};
