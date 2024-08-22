
import { validationSchema } from "../../validationSchema";

export const customerlMasterSchema = {
  customerName: validationSchema.string('Customer Name is required'),
  customerCode: validationSchema.string('Customer Code is required'),
  customerEmail: validationSchema.email('Customer Email is required'),
  customerAddress1: validationSchema.string('Customer Address1 is required'),
  customerAddress2: validationSchema.string('Customer Address2 is required'),
  customerLandmark: validationSchema.string('Customer Landmark is required'),
  customerCity: validationSchema.string('Customer City is required'),
  customerState: validationSchema.string('Customer State is required'),
  customerPostCode: validationSchema.number('Customer PostCode is required'),
  customerCountry: validationSchema.string('Customer Country is required'),
  customerContact: validationSchema.number('Customer Contact is required'),
  customerGst: validationSchema.gst('Customer GST is required'),
  customerPan: validationSchema.pan('PAN is required'),
  customerVat: validationSchema.vat('Customer VAT is required'),
  customerTan: validationSchema.tan('Customer TAN is required'),
  customerStatus: validationSchema.string('Customer Status is required'),
   
};
