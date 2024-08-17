import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { getReaderMasterColumns } from './reader-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import AddBuildingMaster from '../../../Form/master/building-master/add-building-master'
import { buildingData } from '../../../dummyData/building-data'
import { readerData } from '../../../dummyData/reader-data'
import AddReaderMaster from '../../../Form/master/reader-master/add-reader-master'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchReader } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { CompileDeviceReader } from './promiss/device-reader.promiss'
import { setDeviceReaderData } from '../../../Store/Action/device/device-reader/device-reader-action'
import { routes } from '../../../config/routes'

export default function ReaderMaster() {

  const dispatch = useDispatch()
  const reduxDevice = useSelector(state=>state.DeviceReaderReducer)

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getReaderMasterColumns({ readerData, openModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxDevice?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxDevice?.searchJson
    HitApi(json, searchReader).then((result) => {
      if(result){
        CompileDeviceReader(result).then((CompiledData)=>{
          dispatch(setDeviceReaderData(CompiledData))
        })
      }
    })
  }

  return ( 
    <div>
      <PageHeader btnText={'Add Reader'} href={routes?.panel?.device?.createReader} disbleExport />
      {/* <PageHeader metaTitle={'Reader Master'} btnText={'Add Reader'} children={<DeviceReader />} title={'Add Reader'} titleClass={'text-center'} customSize={700} /> */}
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxDevice?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
