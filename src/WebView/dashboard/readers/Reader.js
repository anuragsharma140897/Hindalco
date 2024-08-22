import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchReader } from '../../../Constant/Api/Api'
import { CompileDeviceReader } from '../../master/reader-master/promiss/device-reader.promiss'
import { setDeviceReaderData } from '../../../Store/Action/device/device-reader/device-reader-action'
import cn from '../../../Utils/class-names'
import { setSelectedReader } from '../../../Store/Action/mqtt/mqtt-action'

export default function Reader() {
  const dispatch = useDispatch()
  const reduxDevice = useSelector(state=>state.DeviceReaderReducer)
  const reduxMqtt = useSelector(state => state.MQTTReducer)
  const [selected, setSelected] = useState(null)
  useEffect(()=>{
    if(reduxDevice?.searchJson?.search?.buildingIds && reduxDevice?.doc===null){
      loadData()
    }
  },[reduxDevice])

  const loadData = () =>{
    var json = reduxDevice?.apiJson
    console.log('json', json);
    HitApi(json, searchReader).then((result)=>{
      if(result?.success!==false){
        CompileDeviceReader(result).then((CompiledData)=>{
          dispatch(setDeviceReaderData(CompiledData))
        })
      }
    })
  }
  
  const handleSelect = (ele) =>{
    setSelected(ele?.id)
    dispatch(setSelectedReader(ele))
  }

  let item;

  if(reduxDevice?.doc){
    item = reduxDevice?.doc?.content?.map((ele)=>{
      console.log('ele', ele);
      return <div key={ele.id} className={cn('py-3 px-2 my-1.5 shadow-sm rounded-lg group-hover:cursor-pointer', ele?.id === selected ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')} onClick={()=>handleSelect(ele)}>
        <div><label>Name : {ele?.placementName}</label></div>
        <div><label>IP : {ele?.readerIp}</label></div>
      </div>
    })
  }

  return (
    <div className='grid grid-cols-5 gap-4 group'>{item || 'No Reader Found'}</div>
  )
}
