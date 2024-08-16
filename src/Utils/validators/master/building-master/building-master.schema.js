import { validationSchema } from "../../validationSchema";

export const builingMasterSchema = {
    buildingName: validationSchema.string('Building Name is required'),
    buildingNo: validationSchema.string('Building No is required'),
    unit: validationSchema.string('Unit is required'),
    // addEmptyBag: validationSchema.boolean().refine((val) => val === true, {
    //     message: "Add Empty Bag Status is Required",
    // }),
};
