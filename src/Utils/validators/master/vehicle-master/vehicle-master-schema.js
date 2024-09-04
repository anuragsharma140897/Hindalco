import { validationSchema } from "../../validationSchema";

export const vehicleMasterSchema = {
    vehicleMaker: validationSchema.string('Vehicle Maker is required'),
    vehicleModel: validationSchema.string('Vehicle Model is required'),
    vehicleYear: validationSchema.number('Vehicle Year is required'),
    vehicleEngine: validationSchema.string('Value is required'),
    vehicleNumber : validationSchema.vehicle('Vehicle Number is required'),
    vehicleType : validationSchema.string('Vehicle Type is required'),
    siteIds : validationSchema.string('Site is required'),
   
};
