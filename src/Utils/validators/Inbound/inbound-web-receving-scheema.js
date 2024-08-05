import { z } from 'zod';

// form zod validation schema
export const inboundWebRecevingScheema = z.object({
    buildingName: z.string().min(6, { message: 'Building Name is Required' }),
    buildingNo: z.string().min(6, { message: 'Building Number is Required' }),
    unit: z.string().min(6, { message: 'Unit is Required' }),
    addEmptyBag: z.boolean().refine((val) => val === true, {
        message: "Add Empty Bag Status is Required",
    })
});
