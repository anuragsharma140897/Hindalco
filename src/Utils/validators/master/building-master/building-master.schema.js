import { z } from 'zod';
import { buildingMasterVariable } from '../../../../Constant/variables/master/building-master/building-master.variable';
import { GenerateMessage } from '../../../../config/message';

// form zod validation schema
export const buildingMasterSchema = z.object({
    [buildingMasterVariable?.buildingName]: z.string().min(6, { message: GenerateMessage(buildingMasterVariable?.buildingName, ['required']) }),
    [buildingMasterVariable?.buildingNo]: z.string().min(6, { message: GenerateMessage(buildingMasterVariable?.buildingNo, ['required']) }),
    [buildingMasterVariable?.NoOfReaders]: z.string().min(6, { message: GenerateMessage(buildingMasterVariable?.NoOfReaders, ['required']) }),
    [buildingMasterVariable?.addEmptyBag]: z.boolean().refine((val) => val === true, {
        message: "Add Empty Bag Status is Required",
    }),
});
