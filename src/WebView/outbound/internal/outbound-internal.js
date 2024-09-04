import React, { useCallback } from 'react'
import { searchBuilding } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';

function OutboundInternal() {
    const dispatch = useDispatch()
    const reduxOutbound = useSelector(state => state.OutboundReducer);
    const handleOnChange = useCallback
    ((e, name,fromName) => {
        const { _id } = e;
        let newJson = { [name]: _id };
        if ( name === "dispatchTo" || name === "billTo") {
            newJson = { [name]: e._id , [fromName]: e.value}
        }
        else {
            newJson = { [name]: e.value }
        }
        const updatedJson = { ...reduxOutbound?.apiJson, ...newJson };
        dispatch(setOutboundApiJson(updatedJson));
    }, [dispatch, reduxOutbound?.apiJson]);
    return (
        <div>
            <div className='mt-5 grid grid-cols-2'>
                <div className='flex gap-x-4'>
                    <div className='w-full'>
                        <div className='text-base text-black font-semibold'>Bill To</div>
                        <div className='mt-5'>
                            <SearchableSelect name="billTo" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'billTo',"billToName")} />
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='text-base text-black font-semibold'>Ship To</div>
                        <div className='mt-5'>
                            <SearchableSelect name="dispatchTo" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'dispatchTo',"dispatchToName")} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OutboundInternal