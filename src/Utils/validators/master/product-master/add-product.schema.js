import { validationSchema } from "../../validationSchema";

export const productMasterSchema = {
  productName: validationSchema.string('Product Name Field is Required')
    .min(3, 'Product Name Field should be min 3 characters long'),
  productCode: validationSchema.string('Product Code Field is Required')
    .min(3, 'Product Code Field should be min 3 characters long'),
  productDescription: validationSchema.string('Product Description Field is Required')
    .min(10, 'Product Description Field should be min 10 characters long'),
  productGroup: validationSchema.string('Product Group Field is Required')
    .min(3, 'Product Group Field should be min 3 characters long'),
  sellingCost: validationSchema.string('Selling Cost Field is Required')
    .min(3, 'Selling Cost Field should be min 3 characters long'),
  width: validationSchema.string('Width Field is Required')
    .min(3, 'Width Field should be min 3 characters long'),
  buyingCost: validationSchema.string('Buying Cost is Required')
    .min(3, 'Buying Cost should be min 3 characters long'),
  grade: validationSchema.string('Grade Field is Required')
    .min(1, 'Grade Field should be min 1 characters long'),
  height: validationSchema.string('Height Field is Required')
    .min(2, 'Height Field should be min 2 characters long'),
  length: validationSchema.string('Length Field is Required')
    .min(2, 'Length Field should be min 2 characters long'),
  packedWeight: validationSchema.string('Packed Weight Field is Required')
    .min(2, 'Packed Weight Field should be min 2 characters long'),
  weight: validationSchema.string('Weight Field is Required')
    .min(2, 'Weight Field should be min 2 characters long'),


  // captureBatchNo: validationSchema.string('Width Field is Required')
  //   .min(3, 'Width Field should be min 3 characters long'),
  // captureLotNo: validationSchema.string('Width Field is Required')
  //   .min(3, 'Width Field should be min 3 characters long'),
};
