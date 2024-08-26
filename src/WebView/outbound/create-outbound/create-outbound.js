import React, { useCallback } from 'react'
import PageHeader from '../../../shared/page-header'
import { searchBuilding, searchGeneral } from '../../../Constant/Api/Api'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import DateAndTime from '../../../Component/ui/date-and-time/date-and-time';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import { IoIosAddCircle } from 'react-icons/io';
import { Colors } from '../../../Constant/Colors/Color';
import OutboundAddVehicle from '../add-vehicle/outbound-add-vehicle';
import { useModal } from '../../../shared/modal-views/use-modal';
import AddVehicle from '../add-vehicle/add-vehicle';

function CreateOutbound() {
    const reduxOutbound = useSelector(state => state.OutboundReducer);
    const [defaultDates, setDefaultDates] = useState({
        orderDateTime: new Date(),
        expectedArrival: new Date()
    });
    const dispatch = useDispatch()
    const { openModal, closeModal } = useModal();


    const handleOnChange = useCallback
        ((e, name) => {
            const { id } = e;
            let newJson = { [name]: id };
            if (name === "dispatchFrom" || name === "dispatchTo" || name === "billTo") {
                newJson = { [name]: e.id }
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


  const handleFunctionCall = () => {

    openModal({
      view: <OutboundAddVehicle />,
      customSize: '800px',
      title: "Add Vehicle",
    })

  }
    console.log('reduxOutbound', reduxOutbound);

    return (
        <div>
            <PageHeader metaTitle={'Outbound / Create'} disbleExport />
            {/* Building ID getting / dispatchFrom */}
            <div className='text-base text-black font-semibold'>Dispatch From</div>
            <div className='mt-5'>
                <div className='grid grid-cols-4'>
                    <SearchableSelect name="dispatchFrom" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'dispatchFrom')} />
                </div>
            </div>
            {/* if dispatchFrom the show General */}
            {Object.keys(reduxOutbound?.apiJson).length !== 0 &&
                <div className='mt-5'>
                    <div className='text-base text-black font-semibold'>General</div>
                    <div className='bg-white p-10 rounded-xl grid grid-cols-4 mt-5 gap-x-8'>
                        <DateAndTime label={"Order Date Time"} onChange={(e) => handleDateChange(e, "orderDateTime")} value={defaultDates?.orderDateTime} />
                        <DateAndTime label={"Expected Arrival"} onChange={(e) => handleDateChange(e, "expectedArrival")} value={defaultDates.expectedArrival} />
                        <SearchableSelect name="orderStatus" label="Order Status" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'orderstatus'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'orderstatus' }} value={reduxOutbound?.apiJson?.orderStatus} reduxState={reduxOutbound?.apiJson} onChange={(e) => handleOnChange(e, 'orderStatus')} />
                        <SearchableSelect name="saleType" label="Sale Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'saletype'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'saletype' }} value={reduxOutbound?.apiJson?.saleType} reduxState={reduxOutbound?.apiJson} onChange={(e) => handleOnChange(e, 'saleType')} />
                    </div>
                </div>

            }
            {/* if saleType is INTERNAL then show building to */}

            {
                Object.keys(reduxOutbound?.apiJson).length !== 0 && reduxOutbound?.apiJson?.saleType === "INTERNAL" &&
                <div>
                    <div className='mt-5 grid grid-cols-2'>
                        <div className='flex gap-x-4'>
                            <div className='w-full'>
                                <div className='text-base text-black font-semibold'>Bill To</div>
                                <div className='mt-5'>
                                    {/* <div className='grid grid-cols-4'> */}
                                    <SearchableSelect name="billTo" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'billTo')} />
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='text-base text-black font-semibold'>Ship To</div>
                                <div className='mt-5'>
                                    {/* <div className='grid grid-cols-4'> */}
                                    <SearchableSelect name="dispatchTo" label="Select Building" api={searchBuilding} getFieldName={'buildingName'} onChange={(e) => handleOnChange(e, 'dispatchTo')} />
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*Vehicle */}
                    <AddVehicle/>
                    {/* <div className='flex items-center  mt-5 gap-x-2'>
                        <div className='text-base text-black font-semibold'>Add Vehicle</div>
                        <div className='cursor-pointer'>
                            <IoIosAddCircle size={30} color={Colors.LOGINRED}  onClick={handleFunctionCall}/>
                        </div>
                    </div> */}
                </div>
            }



        </div>
    )
}

export default CreateOutbound