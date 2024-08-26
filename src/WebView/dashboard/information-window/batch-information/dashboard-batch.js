import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { searchBatch, searchRfidTag } from '../../../../Constant/Api/Api'
import { setDashboardBatchData, setDashboardInventoryData, setDashboardSelectedBatchId } from '../../../../Store/Action/dashbaord/batch/dashbaord-batch-action'
import cn from '../../../../Utils/class-names'
import { SelectedItem } from '../../../../Constant/Classes/Classes'
import DashbaordInventory from './dashbaord-inventory'
import { CompileInventoryData } from './promiss/dashboard-promiss'

export default function DashboardBatch() {
  const dispatch = useDispatch()
  const reduxBatch = useSelector(state => state.DashboardBatchReducer)
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  const reduxBuilding = useSelector(state => state.BuildingMasterReducer)
  const reduxMqtt = useSelector(state => state.MQTTReducer)
  const [selectedBatch, setSelectedBatch] = useState()

  useEffect(() => {
    if (reduxBatch?.doc === null && reduxBuilding?.selectedBuildingId !== null && reduxMqtt?.selectedAnteena?.antennaNumber) {
      loadData('init')
    }

  }, [reduxBuilding, reduxMqtt])

  const loadData = (type) => {
    var json = reduxBatch?.apiJson
    Object.assign(json.search, { buildingId: reduxBuilding?.selectedBuildingId })
    if (type === 'init') {
      HitApi(json, searchBatch).then((result) => {
        console.log('result', result);
        if (result?.success !== false) {
          dispatch(setDashboardBatchData(result))
        }
      })
    }
  }
  
  const loadSelectedBatchInventory = (id) => {
    var json = reduxBatch?.inventoryJson
    Object.assign(json.search, { batchId: id })
    HitApi(json, searchRfidTag).then((result) => {
      CompileInventoryData(result).then((CompiledData)=>{
        if(CompiledData){
          dispatch(setDashboardInventoryData(CompiledData))
        }
      })
    })
  }

  const handleSelect = (ele) => {
    setSelectedBatch(ele?.id)
    loadSelectedBatchInventory(ele?.id)
    dispatch(setDashboardSelectedBatchId(ele))
  }

  let item;
  if (reduxBatch?.doc?.content) {
    item = reduxBatch?.doc?.content?.map((ele, index) => {
      return <div className={cn('flex flex-col border px-2 py-3 my-1 bg-white rounded-md shadow-md group-hover:cursor-pointer', ele?.id === selectedBatch ? SelectedItem : '')} onClick={() => handleSelect(ele)}>
        <label className='group-hover:cursor-pointer'>{ele?.batchName}</label>
        <label className='group-hover:cursor-pointer'>{ele?.status}</label>
      </div>
    })
  }

  return (
    <div className='border p-5 bg-white shadow-md rounded-md'>
      <div className='grid grid-cols-6 gap-4 '>
        <div className='group'>{item}</div>
        <div className='group'></div>
        <div className='col-span-4'>
          <label> Inventory </label>
          <DashbaordInventory/>
        </div>
      </div>
    </div>
  )
}
