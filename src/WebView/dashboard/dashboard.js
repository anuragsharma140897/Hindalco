import React from 'react'
import DataReceivedByReader from './data-received-by-reader/data-received-by-reader'
import DataWorkByReader from './data-work-by-reader/data-work-by-reader'
import SearchableSelect from '../../Component/ui/form/select/SearchableSelect'
import { searchBuilding } from '../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { setDeviceReaderApiJson } from '../../Store/Action/device/device-reader/device-reader-action'
import Reader from './readers/Reader'
import DashboardBatch from './information-window/batch-information/dashboard-batch'
import { setBuildingMasterSelectedBuildingId } from '../../Store/Action/master/building-master/building-master-action'

export default function Dashboard() {

  const dispatch = useDispatch()
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  const reduxMqtt = useSelector(state => state.MQTTReducer)

  const handleOnChange = (e) => {
    const { id, label, value } = e

    var json = reduxDevice?.searchJson
    dispatch(setBuildingMasterSelectedBuildingId(id))
    Object.assign(json.search, { "buildingIds": { $in: [id] } })
    dispatch(setDeviceReaderApiJson(json))
  }

  return (
    <div>
      <div className='grid grid-cols-4'> <SearchableSelect api={searchBuilding} getFieldName={'buildingName'} defaultIndex={0} onChange={handleOnChange} /> </div>
      <div className='grid grid-cols-1'> <Reader /> </div>
      <div className='grid grid-cols-1 gap-4 my-4'>
        <div><DashboardBatch/></div>
        {/* <div>Inventory</div> */}
        {/* <div>Errors</div>
        <div>Seciotn 4</div> */}
      </div>
      {/* <div className='grid grid-cols-1 gap-4'>
        {reduxMqtt?.selected?.id && reduxMqtt?.selectedAnteena?.antennaNumber && (<div><DataReceivedByReader/></div>)}
      </div> */}

    </div>
  )
}

