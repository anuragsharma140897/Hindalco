import { validationSchema } from "../../validationSchema";

export const builingMasterSchema = {
    buildingName: validationSchema.string('Building Name is required'),
    buildingNo: validationSchema.string('Building No is required'),
    unitId: validationSchema.string('Unit is required'),
};
