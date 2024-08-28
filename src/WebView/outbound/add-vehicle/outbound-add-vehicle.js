import React, { useState } from 'react';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { searchVehicle } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { setOutboundAddedVehicle, setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import { useModal } from '../../../shared/modal-views/use-modal';
import CustomButton from '../../../Component/ui/buttons/custom-button';

function OutboundAddVehicle() {
  const reduxOutbound = useSelector((state) => state.OutboundReducer);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const reduxPagination = useSelector((state) => state.PaginationReducer);
  const { openModal, closeModal } = useModal();


  const dispatch = useDispatch();

  const handleChange = (e) => {
    const oldJson = reduxOutbound?.apiJson || {};

    console.log('oldJson', oldJson);
    const vehicleIds = oldJson.vehicleIds ? [...oldJson.vehicleIds] : [];

    const isVehicleAlreadySelected = vehicleIds.some(
      (vehicle) => vehicle.vehicleId === e?.id
    );
    if (isVehicleAlreadySelected) {
      alert('Vehicle is already selected');
    } else {
      vehicleIds.push({
        vehicleId: e?.id,
        vehicleNumber :e.value

      });
      const json = {
        ...oldJson,
        vehicleIds: vehicleIds,
      };
      dispatch(setOutboundApiJson(json));
      fetchDetails(e?.id, searchVehicle, setSelectedDetails);
    }
  };

  const fetchDetails = (id, apiMethod, setDetails) => {
    const searchJson = reduxOutbound?.searchJson;
    const json = {
      ...searchJson,
      page: 1,
      limit: reduxPagination?.doc?.limit,
      search: { id },
    };
    HitApi(json, apiMethod).then((result) => {
      console.log('result:result ', result);
      setDetails(result?.content?.[0] || null);
      const oldArr = [...reduxOutbound?.vehicleAdded]; 

      console.log("oldArr: ", oldArr);
      oldArr?.push(result?.content?.[0]);

      dispatch( setOutboundAddedVehicle(oldArr))
    });
  };


  
  console.log("selectedDetails", selectedDetails);
  return (
    <div className='p-10'>
      <div className='mb-5'>
        <SearchableSelect lable={"Select Vehicle"} name="vehicleId" label="Vehicle" api={searchVehicle} getFieldName={'vehicleNumber'} onChange={(e) => handleChange(e)} />
        {
          selectedDetails ?
          <div>
            <div className='mt-5'>
              <div className='grid grid-cols-4 gap-4'>
                <div className='w-full'><span className='font-bold'> Vehicle Number</span>  : <span>{selectedDetails?.vehicleNumber}</span> </div>
                <div className='w-full'><span className='font-bold'> Vehicle Maker</span>  : <span>{selectedDetails?.vehicleMaker}</span> </div>
                <div className='w-full'><span className='font-bold'> Vehicle Engine</span>  : <span>{selectedDetails?.vehicleEngine}</span> </div>
                <div className='w-full'><span className='font-bold'> Vehicle Code</span>  : <span>{selectedDetails?.vehicleEngine}</span> </div>
                <div className='w-full'><span className='font-bold'> Vehicle Type</span>  : <span>{selectedDetails?.vehicleType}</span> </div>
                <div className='w-full'><span className='font-bold'>Vehicle Year</span>  : <span>{selectedDetails?.vehicleYear}</span> </div>
              </div>
              <div className='mt-5 flex justify-end'>
                <CustomButton text={'Okay'} variant='flat' className={''} onClick={closeModal} />
              </div>

            </div>
          </div>
           :
           <div className='mt-5 flex justify-end'>
           <CustomButton text={'Close'} variant='flat' className={''} onClick={closeModal} />
         </div>
        }
       

      </div>
    </div>
  );
}

export default OutboundAddVehicle;
