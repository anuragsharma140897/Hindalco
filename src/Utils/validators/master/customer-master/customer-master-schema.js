
import { validationSchema } from "../../validationSchema";

export const customerlMasterSchema = {
  customerName: validationSchema.string('Customer Name is required'),
  customerCode: validationSchema.string('Customer Code is required'),
  customerGroup: validationSchema.string('Customer Group is required'),
  customerEmail: validationSchema.string('Customer Email is required'),
  customerVisibility: validationSchema.string('Customer Visibility is required'),
  customerType: validationSchema.string('Customer Type is required'),
  customerAddress1: validationSchema.string('Customer Address1 is required'),
  customerAddress2: validationSchema.string('Customer Address2 is required'),
  customerLandmark: validationSchema.string('Customer Landmark is required'),
  customerCity: validationSchema.string('Customer City is required'),
  customerState: validationSchema.string('Customer State is required'),
  customerRegion: validationSchema.string('Customer Region is required'),
  customerPostCode: validationSchema.string('Customer PostCode is required'),
  customerCountry: validationSchema.string('Customer Country is required'),
  customerContact: validationSchema.string('Customer Contact is required'),
  customerGst: validationSchema.string('Customer GST is required'),
  customerPan: validationSchema.string('Status is required'),
  customerStatus: validationSchema.string('Customer PAN is required'),
  customerVat: validationSchema.string('Customer VAT is required'),
  customerTan: validationSchema.string('Customer TAN is required'),
   
};
