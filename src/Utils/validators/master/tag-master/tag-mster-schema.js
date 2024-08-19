import { validationSchema } from "../../validationSchema";

export const tagMasterSchema = {
    identification: validationSchema.string('Identification is required'),
    typeName: validationSchema.string('Type Name is required'),
    typeId: validationSchema.string('Type Id is required'),
    locationName: validationSchema.string('Location Name is required'),
    locationId: validationSchema.string('Location Id is required'),
    tagNo: validationSchema.string('Tag Number is required'),
    tagUsedForName: validationSchema.string('Tag Used For Name is required'),
    tagUsedForId: validationSchema.string('Tag Used For ID is required'),
    status: validationSchema.string('Status is required'),

   
};
