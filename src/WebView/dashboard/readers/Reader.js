import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchReader } from '../../../Constant/Api/Api'
import { CompileDeviceReader } from '../../master/reader-master/promiss/device-reader.promiss'
import { setDeviceReaderData } from '../../../Store/Action/device/device-reader/device-reader-action'
import cn from '../../../Utils/class-names'
import { setSelectedReader, setSelectedReaderAnteena } from '../../../Store/Action/mqtt/mqtt-action'

export default function Reader() {
  const dispatch = useDispatch()
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  const reduxMqtt = useSelector(state => state.MQTTReducer)
  const [selected, setSelected] = useState(null)
  const [selectedAnteena, setSelectedAnteena] = useState(null)
  useEffect(() => {
    if (reduxDevice?.searchJson?.search?.buildingIds && reduxDevice?.doc === null) {
      loadData()
    }

  }, [reduxDevice, selected])

  const loadData = () => {
    var json = reduxDevice?.apiJson
    console.log('json', json);
    HitApi(json, searchReader).then((result) => {
      if (result?.success !== false) {
        CompileDeviceReader(result).then((CompiledData) => {
          dispatch(setDeviceReaderData(CompiledData))
        })
      }
    })
  }

  const handleSelect = (ele) => {
    setSelected(ele?.id)
    setSelectedAnteena(null)
    dispatch(setSelectedReader(ele))
  }

  const handleAnteenaSelect = (ele) => {
    setSelectedAnteena(ele?.antennaNumber)
    dispatch(setSelectedReaderAnteena(ele))
  }

  let item;

  if (reduxDevice?.doc) {
    item = reduxDevice?.doc?.content?.map((ele) => {
      return <div key={ele.id} className={cn('py-3 px-2 my-1.5 shadow-md rounded-lg group-hover:cursor-pointer', ele?.id === selected ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')} onClick={() => handleSelect(ele)}>
        <div><label>Name : {ele?.placementName}</label></div>
        <div><label>IP : {ele?.readerIp}</label></div>
      </div>
    })
  }

  let anteena;

  if (reduxMqtt?.selected?.antenna1) {
    const { antenna1, antenna2, antenna3, antenna4 } = reduxMqtt?.selected || {};
    const antennaData = [antenna1, antenna2, antenna3, antenna4].filter(Boolean);
    anteena = antennaData.map((ele, index) => {
      return <div key={index} className={cn('py-3 px-2 my-1.5 shadow-md rounded-lg group-hover:cursor-pointer border', ele?.antennaNumber === selectedAnteena ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')} onClick={()=>handleAnteenaSelect(ele)}>
        <div><label>Antenna Details</label></div>
        <div className='grid grid-cols-2 gap-4'>
          <label>Number : </label>
          <label className='text-right'>{ele?.antennaNumber}</label>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <label>Action : </label>
          <label className='text-right'>{ele?.antennaAction}</label>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <label>Status : </label>
          <label className={cn('text-right font-bold', ele?.antennaStatus.toLowerCase() === 'connected' ? 'text-green-buttonGreen ' : 'text-red-buttonRed')}>{ele?.antennaStatus}</label>
        </div>
      </div>
    })
  }

  return (
    <div>
      <div className='grid grid-cols-5 gap-4 group'>{item || 'No Reader Found'}</div>
      {anteena && <div className='grid grid-cols-5 gap-4 group'>{anteena || 'No An Found'}</div>}
    </div>
  )
}
