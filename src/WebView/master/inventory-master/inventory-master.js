import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from "../../../shared/page-header";
import AddInventoryMaster from '../../../Form/master/inventory-master/add-inventory-master';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchBatch } from '../../../Constant/Api/Api';
import { getInventoryMasterColumns } from './inventory-column';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import { setInventoryMasterData } from '../../../Store/Action/master/inventory-master/inventory-master-action';
import { CompileInventoryMaster } from './promise/inventory-master-promise';


function InventoryMaster() {
    const reduxInventory = useSelector(state => state.InventoryMasterReducer)
    const reduxPagination = useSelector(state => state.PaginationReducer)


  const [loading ,setLoading] = useState(false)
  const { openModal, closeModal } = useModal();

  const columns = useMemo(() => getInventoryMasterColumns({ openModal, closeModal,loading ,setLoading }))

  const { visibleColumns } = useColumn(columns);
  const dispatch = useDispatch();


  useEffect(() => {
    if (reduxInventory?.doc === null) {
      loadData('init')
    }
  }, [])


  const loadData = (type) => {
    var json = reduxInventory?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit })
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit })
    }
    HitApi(json, searchBatch).then((result) => {


      if (result) {
        CompileInventoryMaster(result).then((CompiledData) => {
          dispatch(setInventoryMasterData(CompiledData))
          var tp = { limit: json?.limit, totalPages: CompiledData?.totalPages, number: CompiledData?.number, totalElements: CompiledData?.totalElements }
          dispatch(setPagination(tp))
        })
      }
    })
  }
  return (
    <div>
      <PageHeader btnText={'Add Batch'} children={<AddInventoryMaster closeModal={closeModal} />} title={'Add Batch'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxInventory?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        ApitHit={loadData}
      />
    </div>
  )
}

export default InventoryMaster 
