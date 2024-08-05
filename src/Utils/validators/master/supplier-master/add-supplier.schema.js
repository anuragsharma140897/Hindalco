import { z } from 'zod';
import { GenerateMessage } from '../../../../config/message';
import { supplierMasterVariable } from '../../../../Constant/variables/master/supplier-master/supplier-master.variable';

// form zod validation schema
export const addSupplierSchema = z.object({
  [supplierMasterVariable?.supplierCode]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierCode, ['required'])}),
  [supplierMasterVariable?.supplierName]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierName, ['required'])}),
  [supplierMasterVariable?.supplierNotes]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierNotes, ['required'])}),
  [supplierMasterVariable?.supplierAddress1]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierAddress1, ['required'])}),
  [supplierMasterVariable?.supplierAddress2]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierAddress2, ['required'])}),
  [supplierMasterVariable?.supplierCity]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierCity, ['required'])}),
  [supplierMasterVariable?.supplierState]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierState, ['required'])}),
  [supplierMasterVariable?.supplierRegion]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierRegion, ['required'])}),
  [supplierMasterVariable?.supplierCountry]: z.number().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierCountry, ['number'])}),
  [supplierMasterVariable?.supplierContactPhone]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierContactPhone, ['required'])}),
  [supplierMasterVariable?.supplierContactEmail]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierContactEmail, ['required'])}),
  [supplierMasterVariable?.supplierClass]: z.string().min(6, {message:GenerateMessage(supplierMasterVariable?.supplierClass, ['required'])}),

});


