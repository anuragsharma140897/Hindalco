import { z } from 'zod';
import { ProductMasterVariable } from '../../../../Constant/variables/master/product-master/product-master.variable';
import { GenerateMessage } from '../../../../config/message';

// form zod validation schema
export const addProduct = z.object({
  [ProductMasterVariable?.productName]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.productName, ['required'])}),
  [ProductMasterVariable?.productCode]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.productCode, ['required'])}),
  [ProductMasterVariable?.productDescription]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.productDescription, ['required'])}),
  [ProductMasterVariable?.productGroup]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.productGroup, ['required'])}),
  [ProductMasterVariable?.height]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.height, ['required'])}),
  [ProductMasterVariable?.width]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.width, ['required'])}),
  [ProductMasterVariable?.length]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.length, ['required'])}),
  [ProductMasterVariable?.packedWeight]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.packedWeight, ['required'])}),
  [ProductMasterVariable?.weight]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.weight, ['required'])}),
  [ProductMasterVariable?.buyingCost]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.buyingCost, ['required'])}),
  [ProductMasterVariable?.sellingCost]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.sellingCost, ['required'])}),
  [ProductMasterVariable?.grade]: z.string().min(6, {message:GenerateMessage(ProductMasterVariable?.grade, ['required'])}),
});
