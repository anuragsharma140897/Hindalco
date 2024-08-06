import { z } from 'zod';
import { customerMasterVariable } from '../../../../Constant/variables/master/customer-master/customer-master.variable';
import { GenerateMessage } from '../../../../config/message';

// form zod validation schema
export const addCustomerSchema = z.object({
  [customerMasterVariable?.customerCode]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerCode, ['required'])}),
  [customerMasterVariable?.customerName]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerName, ['required'])}),
  [customerMasterVariable?.customerGroup]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerGroup, ['required'])}),
  [customerMasterVariable?.customerEmail]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerEmail, ['required'])}),
  [customerMasterVariable?.customerVisibility]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerVisibility, ['required'])}),
  [customerMasterVariable?.customerType]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerType, ['required'])}),
  [customerMasterVariable?.customerAddress1]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerAddress1, ['required'])}),
  [customerMasterVariable?.customerAddress2]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerAddress2, ['required'])}),
  [customerMasterVariable?.customerLandmark]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerLandmark, ['required'])}),
  [customerMasterVariable?.customerCity]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerCity, ['required'])}),
  [customerMasterVariable?.customerState]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerState, ['required'])}),
  [customerMasterVariable?.customerRegion]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerRegion, ['required'])}),
  [customerMasterVariable?.customerPostcode]: z.number().min(6, {message:GenerateMessage(customerMasterVariable?.customerPostcode, ['number'])}),
  [customerMasterVariable?.customerCountry]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerCountry, ['required'])}),
  [customerMasterVariable?.customerContact]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerContact, ['required'])}),
  [customerMasterVariable?.customerCST]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerCST, ['required'])}),
  [customerMasterVariable?.customerPAN]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerPAN, ['required'])}),
  [customerMasterVariable?.customerStatus]: z.string({message:GenerateMessage(customerMasterVariable?.customerStatus, ['required'])}),
  [customerMasterVariable?.customerVAT]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerVAT, ['required'])}),
  [customerMasterVariable?.customerTAN]: z.string().min(6, {message:GenerateMessage(customerMasterVariable?.customerTAN, ['required'])}),

});


