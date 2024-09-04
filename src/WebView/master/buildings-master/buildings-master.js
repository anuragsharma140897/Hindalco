import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { GetBuildingMasterColumns } from './building-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master'
import { buildingData } from '../../../dummyData/building-data'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchBuilding } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { CompileBuildingMaster } from './promiss/building-master.promiss'
import { setBuildingMasterApiJson, setBuildingMasterData } from '../../../Store/Action/master/building-master/building-master-action'
import { ScreenName } from '../../../Constant/Screen/Screen'
import ControlledTable from '../../../Component/ui/table/custom-table'
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction'

export default function BuildingsMaster() {
  const dispatch = useDispatch();
  const reduxBuilding = useSelector(state => state.BuildingMasterReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);

  const { openModal, closeModal } = useModal();

  const loadData = (type) => {
    var json = reduxBuilding?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }



    HitApi(json, searchBuilding).then((result) => {
      if (result?.success !== false) {
        CompileBuildingMaster(result).then((compiledData) => {
          dispatch(setBuildingMasterData(compiledData));
          dispatch(setPagination({
            limit: json?.limit,
            totalPages: compiledData?.totalPages,
            number: compiledData?.number,
            totalElements: compiledData?.totalElements,
          }));
        });
      } else {
        dispatch(setBuildingMasterData([]));
      }
    });
    
  }

  const columns = useMemo(() => GetBuildingMasterColumns(openModal, closeModal, loadData))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxBuilding?.doc === null) {
      loadData('init')
    }
  }, [reduxBuilding])



  return (
    <div>
      <PageHeader screen={ScreenName.buildingMaster} metaTitle={'Building Master'} btnText={'Add Building'} children={<AddBuildingMaster closeModal={closeModal} ApiHit={loadData} />} title={'Add Building'} titleClass={'text-center'} customSize={700} />
      <ControlledTable
        screen={ScreenName.buildingMaster}
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxBuilding?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        json={reduxBuilding?.searchJson}
        setAction={setBuildingMasterApiJson}
        ApiHit={loadData}
      />
    </div>
  )
}
