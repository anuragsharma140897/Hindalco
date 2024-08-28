import React, { useCallback, useState } from 'react'
import { Radio, RadioGroup } from 'rizzui';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { searchCustomer, searchSupplier } from '../../../Constant/Api/Api';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import { useDispatch, useSelector } from 'react-redux';
import Details from './Details/Details';

function OutboundExternal() {
    const reduxOutbound = useSelector(state => state.OutboundReducer);

    const dispatch = useDispatch()
    const handleOnChange = useCallback
        ((e, name, fromName) => {
            const { id } = e;
            let newJson = { [name]: id };
            if (name === "dispatchTo" || name === "billTo") {
                newJson = { [name]: e.id, [fromName]: e.value }
            }
            else {
                newJson = { [name]: e.value }
            }
            const updatedJson = { ...reduxOutbound?.apiJson, ...newJson };
            dispatch(setOutboundApiJson(updatedJson));
        }, [dispatch, reduxOutbound?.apiJson]);

    return (
        <div className='mt-5'>
            <div>
                <div className='mt-5 grid grid-cols-2'>
                    <div className='flex gap-x-4'>
                        <div className='w-full'>
                            <div className='text-base text-black font-semibold'>Bill To</div>
                            <div className='mt-5'>
                                <SearchableSelect name="billTo" label="Select Building" api={searchCustomer} getFieldName={'customerName'} onChange={(e) => handleOnChange(e, 'billTo', "billToName")} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='text-base text-black font-semibold'>Ship To</div>
                            <div className='mt-5'>
                                <SearchableSelect name="dispatchTo" label="Select Building" api={searchCustomer} getFieldName={'customerName'} onChange={(e) => handleOnChange(e, 'dispatchTo', "dispatchToName")} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {
                reduxOutbound?.apiJson.billTo && reduxOutbound?.apiJson.dispatchTo &&
                // <div className='grid grid-cols-2 mt-5 gap-x-5'>
                //     <div>
                //         <div className='text-base text-black font-semibold'>
                //             Bill To Details
                //         </div>
                //       <div className='bg-white grid grid-cols-3 mt-3'>
                //       <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Name
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Code
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Group
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Email
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Type
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Address1
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //       </div>
                //     </div>
                //     <div>
                //         <div className='text-base text-black font-semibold'>
                //             Ship To Details
                //         </div>
                //       <div className='bg-white grid grid-cols-3 mt-3'>
                //       <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Name
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Code
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Group
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Email
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Type
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //         <div className=' border w-full p-2'>
                //             <div className='font-semibold'>
                //             Customer Address1
                //             </div>
                //             <div className='text-xs'>
                //             22/OB/00000000002122 
                //             </div>
                //         </div>
                //       </div>
                //     </div>
                    
                // </div>
                <Details/>
            }
        </div>
    )
}

export default OutboundExternal