import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../shared/modal-views/use-modal'
import { getGeneralMasterColumns } from '../general-master/general-column'
import AddVehicleMaster from '../../../Form/master/vehicle-master/add-vehcile-master'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useColumn } from '../../../Hooks/use-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getVehicleMasterColumns } from './vehicle-column'
import { searchVehicle } from '../../../Constant/Api/Api'
import { setVehicleMasterData } from '../../../Store/Action/master/vehicle-master/vehicle-master-action'
import { CompileVehicleMaster } from './promise/vehicle-master-promise'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction'




function Vehiclemaster() {
  const dispatch = useDispatch()
  const reduxVehicle = useSelector(state => state.VehicleMasterReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer)

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getVehicleMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxVehicle?.doc === null){
      loadData('init')
    }
  }, [])
  const loadData = (type) => {
    var json = reduxVehicle?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit })
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit })
    }
    HitApi(json, searchVehicle).then((result) => {
      if(result){
        CompileVehicleMaster(result).then((CompiledData)=>{
          dispatch(setVehicleMasterData(CompiledData))
          var tp = { limit: json?.limit, totalPages: CompiledData?.totalPages, number: CompiledData?.number, totalElements: CompiledData?.totalElements }
          dispatch(setPagination(tp))
        })
      }
    })
  }


  return (
    <div>
      <PageHeader btnText={'Add Vehicle'} children={<AddVehicleMaster closeModal={closeModal} />} title={'Add Vhecile'} customSize={800} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxVehicle?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        ApitHit={loadData}
      />
    </div>
  )
}

export default Vehiclemaster