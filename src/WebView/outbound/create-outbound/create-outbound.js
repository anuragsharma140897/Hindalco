import React, { useCallback, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { useDispatch, useSelector } from 'react-redux';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import { addOrder, searchBuilding, searchGeneral } from '../../../Constant/Api/Api'
import DateAndTime from '../../../Component/ui/date-and-time/date-and-time';
import OutboundInternal from '../internal/outbound-internal';
import AddVehicle from '../add-vehicle/add-vehicle';
import BatchWithout from '../internal/batch-without';


function CreateOutbound() {
    const reduxOutbound = useSelector(state => state.OutboundReducer);
    const [defaultDates, setDefaultDates] = useState({
        orderDateTime: new Date(),
        expectedArrival: new Date()
    });
    const dispatch = useDispatch()

    const handleOnChange = useCallback
        ((e, name,fromName) => {
            const { id } = e;
            let newJson = { [name]: id };
            if ( name === "dispatchTo" || name === "billTo") {
                newJson = { [name]: e.id }
            }
            else if(name === "dispatchFrom" || name === "billTo"){
                newJson = { [name]: e.id ,[fromName] :e.value}
            }
            else {
                newJson = { [name]: e.value }
            }
            const updatedJson = { ...reduxOutbound?.apiJson, ...newJson };
            dispatch(setOutboundApiJson(updatedJson));
        }, [dispatch, reduxOutbound?.apiJson]);


    const handleDateChange = (e, name) => {
        setDefaultDates(prevState => ({
            ...prevState,
            [name]: e
        }));
        const formattedDate = e?.toISOString()?.slice(0, 19);
        const updatedJson = { ...reduxOutbound?.apiJson, [name]: formattedDate };
        dispatch(setOutboundApiJson(updatedJson));
    };

    console.log("reduxOutbound",reduxOutbound);

    return (
        <div>
            <PageHeader metaTitle={'Outbound / Create'} disbleExport />
            {/* Building ID getting / dispatchFrom */}
            <div>
                <div className='text-base text-black font-semibold'>Dispatch From</div>
                <div className='mt-5'>
                    <div className='grid grid-cols-4'>
                        <SearchableSelect  name="dispatchFrom" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'dispatchFrom',"dispatchFromName")} />
                    </div>
                </div>
            </div>
            {/* if dispatchFrom the show General */}
            {Object.keys(reduxOutbound?.apiJson).length !== 0 &&
                <div className='mt-5'>
                    <div className='text-base text-black font-semibold'>General</div>
                    <div className='bg-white p-10 rounded-xl grid grid-cols-4 mt-5 gap-x-8'>
                        <DateAndTime lable={"Order Date Time"} onChange={(e) => handleDateChange(e, "orderDateTime")} value={defaultDates?.orderDateTime} />
                        <DateAndTime lable={"Expected Arrival"} onChange={(e) => handleDateChange(e, "expectedArrival")} value={defaultDates.expectedArrival} />
                        <SearchableSelect lable={"Order Status"} name="orderStatus" label="Order Status" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'orderstatus'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'orderstatus' }} value={reduxOutbound?.apiJson?.orderStatus} reduxState={reduxOutbound?.apiJson} onChange={(e) => handleOnChange(e, 'orderStatus')} />
                        <SearchableSelect lable={"Sale Type"} name="saleType" label="Sale Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'saletype'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'saletype' }} value={reduxOutbound?.apiJson?.saleType} reduxState={reduxOutbound?.apiJson} onChange={(e) => handleOnChange(e, 'saleType')} />
                    </div>
                </div>

            }
            {/* if saleType is INTERNAL then show building to */}
            {
                Object.keys(reduxOutbound?.apiJson).length !== 0 && reduxOutbound?.apiJson?.saleType === "INTERNAL" &&
                <OutboundInternal />
            }
            {/* addvehicle */}
            {reduxOutbound?.apiJson.billTo && reduxOutbound?.apiJson.dispatchTo &&
                <div>
                    <AddVehicle />
                </div>
            }
            {/* batch or without batch */}
            {
                reduxOutbound?.apiJson?.vehicleIds?.length > 0 && <BatchWithout/>
            }
            

        </div>
    )
}

export default CreateOutbound