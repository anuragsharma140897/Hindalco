import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux'
import { useColumn } from '../../../Hooks/use-column'
import { useModal } from '../../../shared/modal-views/use-modal'
import AddZoneMaster from '../../../Form/master/zone-master/add-zone-master'
import { setZoneMasterData } from '../../../Store/Action/master/zone-master/zone-master-action'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getZoneMasterColumns } from './zone-column'
import { CompileZoneMaster } from './promise/zone-master-promise'
import { searchZone } from '../../../Constant/Api/Api'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'




function ZoneMaster() {
  const dispatch = useDispatch()
  const reduxZone = useSelector(state => state.ZoneMasterReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getZoneMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxZone?.doc === null) {
      loadData()
    }
  }, [])
  const loadData = () => {
    var json = reduxZone?.searchJson
    HitApi(json, searchZone).then((result) => {
      if (result) {
        CompileZoneMaster(result).then((CompiledData) => {
          dispatch(setZoneMasterData(CompiledData))
        })
      }
    })
  }
  return (
    <div>
      <PageHeader btnText={'Add Zone'} children={<AddZoneMaster closeModal={closeModal} />} title={'Add Zone'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxZone?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}

export default ZoneMaster