import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { searchVehicle } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { setOutboundAddedVehicle, setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';
import { useModal } from '../../../shared/modal-views/use-modal';

function OutboundAddVehicle() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const reduxOutbound = useSelector((state) => state.OutboundReducer);
  const reduxPagination = useSelector((state) => state.PaginationReducer);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleChange = (e) => {
    const oldJson = reduxOutbound?.apiJson || {};
    const vehicleIds = oldJson.vehicleIds ? [...oldJson.vehicleIds] : [];

    if (vehicleIds.some((vehicle) => vehicle.vehicleId === e?._id)) {
      alert('Vehicle is already selected');
    } else {
      vehicleIds.push({ vehicleId: e?._id, vehicleNumber: e.value });
      dispatch(setOutboundApiJson({ ...oldJson, vehicleIds }));
      fetchDetails(e?._id);
    }
  };

  const fetchDetails = (_id) => {
    const json = {
      ...reduxOutbound?.searchJson,
      page: 1,
      limit: reduxPagination?.doc?.limit,
      search: { _id },
    };
    HitApi(json, searchVehicle).then((result) => {
      const vehicleDetails = result?.content?.[0] || null;
      setSelectedDetails(vehicleDetails);
      if (vehicleDetails) {
        dispatch(setOutboundAddedVehicle([...reduxOutbound?.vehicleAdded, vehicleDetails]));
      }
    });
  };

  const fields = [
    { label: 'Vehicle Number', value: 'vehicleNumber' },
    { label: 'Vehicle Maker', value: 'vehicleMaker' },
    { label: 'Vehicle Engine', value: 'vehicleEngine' },
    { label: 'Vehicle Type', value: 'vehicleType' },
    { label: 'Vehicle Year', value: 'vehicleYear' },
    { label: 'Vehicle Model', value: 'vehicleModel' },
  ];

  return (
    <div className='p-10'>
      <div className='mb-5'>
        <SearchableSelect
          label="Select Vehicle"
          name="vehicleId"
          api={searchVehicle}
          getFieldName={'vehicleNumber'}
          onChange={handleChange}
        />
        {selectedDetails ? (
          <div className='mt-5'>
            <div className='bg-white grid grid-cols-3 mt-3'>
              {fields.map(({ label, value }) => (
                <div key={value} className='border w-full p-2'>
                  <div className='font-semibold'>{label}</div>
                  <div className='text-xs'>{selectedDetails[value]}</div>
                </div>
              ))}
            </div>
            <div className='mt-5 flex justify-end'>
              <CustomButton text={'Okay'} variant='flat' onClick={closeModal} />
            </div>
          </div>
        ) : (
          <div className='mt-5 flex justify-end'>
            <CustomButton text={'Close'} variant='flat' onClick={closeModal} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OutboundAddVehicle;