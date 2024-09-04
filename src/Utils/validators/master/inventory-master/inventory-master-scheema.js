import { validationSchema } from "../../validationSchema";

export const inventoryMasterSchema = {
    batchNumber: validationSchema.string('Batch Number is required'),
    totalInventory: validationSchema.number('Total Inventory is required'),
    batchName: validationSchema.string('Batch Name is required'),
    product_id :validationSchema.string('Product is required'),
   
};
