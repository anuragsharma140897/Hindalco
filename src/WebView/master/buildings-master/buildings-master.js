import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { getBuildingMasterColumns } from './building-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master'
import { buildingData } from '../../../dummyData/building-data'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchBuilding } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { CompileBuildingMaster } from './promiss/building-master.promiss'
import { setBuildingMasterData } from '../../../Store/Action/master/building-master/building-master-action'

export default function BuildingsMaster() {
  const dispatch = useDispatch();
  const reduxBuilding = useSelector(state=>state.BuildingMasterReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getBuildingMasterColumns({ buildingData, openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxBuilding?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxBuilding?.searchJson
    HitApi(json, searchBuilding).then((result) => {
      if(result){
        CompileBuildingMaster(result).then((CompiledData)=>{
          dispatch(setBuildingMasterData(CompiledData))
        })
      }
    })
  }

  return (
    <div>
      <PageHeader metaTitle={'Building Master'} btnText={'Add Building'} children={<AddBuildingMaster closeModal={closeModal} />} title={'Add Building'} titleClass={'text-center'} customSize={700} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxBuilding?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
