import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getVehicleMasterColumns } from '../vehicle-master/vehicle-column';
import { useColumn } from '../../../Hooks/use-column';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchLocation, searchVehicle } from '../../../Constant/Api/Api';
import { CompileVehicleMaster } from '../vehicle-master/promise/vehicle-master-promise';
import { setVehicleMasterData } from '../../../Store/Action/master/vehicle-master/vehicle-master-action';
import AddVehicleMaster from '../../../Form/master/vehicle-master/add-vehcile-master';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import { CompileLocationMaster } from './promise/location-master-promise';
import { setLocationMasterData } from '../../../Store/Action/master/location-master/location-master-action';
import { getLocationMasterColumns } from './location-master-column';
import AddLocationMaster from '../../../Form/master/location-master/add-location-master';





function LocationMaster() {
  const dispatch = useDispatch()
  const reduxLocation = useSelector(state => state.LocationMasterReducer)

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getLocationMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxLocation?.doc === null){
      loadData()
    }
  }, [])
  const loadData = () => {
    var json = reduxLocation?.searchJson
    HitApi(json, searchLocation).then((result) => {
      if(result){
        CompileLocationMaster(result).then((CompiledData)=>{
          dispatch(setLocationMasterData(CompiledData))
        })
      }
    })
  }


  return (
    <div>
      <PageHeader btnText={'Add Location'} children={<AddLocationMaster closeModal={closeModal} />} title={'Add Location'} customSize={800} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxLocation?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}

export default LocationMaster