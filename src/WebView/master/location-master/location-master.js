import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchLocation } from '../../../Constant/Api/Api';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import { CompileLocationMaster } from './promise/location-master-promise';
import { setLocationMasterData } from '../../../Store/Action/master/location-master/location-master-action';
import { getLocationMasterColumns } from './location-master-column';
import AddLocationMaster from '../../../Form/master/location-master/add-location-master';





function LocationMaster() {
  const dispatch = useDispatch()
  const reduxLocation = useSelector(state => state.LocationMasterReducer)
  const [loading ,setLoading] = useState(false)

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getLocationMasterColumns({ openModal, closeModal ,loading ,setLoading}))
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
      <PageHeader btnText={'Add Location'} children={<AddLocationMaster closeModal={closeModal} />} title={'Add Location'} customSize={400} />
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