import { validationSchema } from "../../validationSchema";

export const builingMasterSchema = {
    buildingName: validationSchema.string('Building Name Field will be number'),
    buildingNo: validationSchema.string('Building Name Field will be number'),
    NoOfReaders: validationSchema.string('Building Name Field will be number'),
    // addEmptyBag: validationSchema.boolean().refine((val) => val === true, {
    //     message: "Add Empty Bag Status is Required",
    // }),
};
