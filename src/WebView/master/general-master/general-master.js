import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchGeneral } from '../../../Constant/Api/Api'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getGeneralMasterColumns } from './general-column'
import { CompileGeneralMaster } from './promise/general-master-promise'
import { setGeneralMasterData } from '../../../Store/Action/master/general-master/general-master-action'
import AddGeneralMaster from '../../../Form/master/general-master/add-general-master'
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction'


export default function GeneralMaster() {
  const dispatch = useDispatch()
  const reduxGeneral = useSelector(state => state.GeneralMasterReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const [loading ,setLoading ] = useState(false)


  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getGeneralMasterColumns({ openModal, closeModal ,loading,setLoading }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxGeneral?.doc === null) {
      loadData('init')
    }
  }, [])
  const loadData = (type) => {
    var json = reduxGeneral?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit })
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit })
    }

    console.log('json', json);
    HitApi(json, searchGeneral).then((result) => {
      if (result) {
        CompileGeneralMaster(result).then((CompiledData) => {
          dispatch(setGeneralMasterData(CompiledData))
          var tp = { limit: json?.limit, totalPages: CompiledData?.totalPages, number: CompiledData?.number, totalElements: CompiledData?.totalElements }
          dispatch(setPagination(tp))
        })
      }
    })
  }


  return (
    <div>
      <PageHeader btnText={'Add General Master'} children={<AddGeneralMaster closeModal={closeModal} />} title={'Add General Master'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxGeneral?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        ApitHit={loadData}

      />
    </div>
  )
}
