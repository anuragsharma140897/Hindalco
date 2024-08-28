import { validationSchema } from "../../validationSchema";

export const addSupplierSchema = {
  supplierName: validationSchema.string('Supplier Name is required'),
  supplierCode: validationSchema.string('Supplier Code is required'),
  supplierGroup: validationSchema.string('Supplier Group is required'),
  supplierType: validationSchema.string('Supplier Type is required'),
  supplierContactEmail: validationSchema.email('Supplier Email is required'),
  supplierAddress1: validationSchema.string('Supplier Address1 is required'),
  supplierAddress2: validationSchema.string('Supplier Address2 is required'),
  supplierLandmark: validationSchema.string('Supplier Landmark is required'),
  supplierCity: validationSchema.string('Supplier City is required'),
  supplierState: validationSchema.string('Supplier State is required'),
  supplierPostCode: validationSchema.number('Supplier PostCode is required'),
  supplierCountry: validationSchema.string('Supplier Country is required'),
  supplierContactPhone: validationSchema.number('Supplier Contact is required'),
  supplierGst: validationSchema.gst('Supplier GST is required'),
  supplierPan: validationSchema.pan('PAN is required'),
  supplierVat: validationSchema.vat('Supplier VAT is required'),
  supplierTan: validationSchema.tan('Supplier TAN is required'),
  supplierStatus: validationSchema.string('Supplier Status is required'),
  siteIds: validationSchema.string('Site is required'),

   
};
// supplierGroup
