import { validationSchema } from "../../validationSchema";

export const inventoryMasterSchema = {
    batchNumber: validationSchema.string('Batch Number is required'),
    totalInventory: validationSchema.string('Total Inventory is required'),
   
};
