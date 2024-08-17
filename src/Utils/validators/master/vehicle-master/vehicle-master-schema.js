import { validationSchema } from "../../validationSchema";

export const vehicleMasterSchema = {
    vehicleMaker: validationSchema.string('Vehicle Maker is required'),
    vehicleModel: validationSchema.string('Vehicle Model is required'),
    vehicleYear: validationSchema.string('Vehicle Year is required'),
    vehicleType: validationSchema.string('Vehicle Type is required'),
    vehicleEngine: validationSchema.string('Value is required'),
    vehicleGear: validationSchema.string('Status is required'),
    vendorId: validationSchema.string('Used By is required'),
   
};
