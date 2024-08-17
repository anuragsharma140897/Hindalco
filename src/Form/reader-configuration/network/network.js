import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { readerNetwork } from '../../../Constant/Api/Api'
import { setReaderConfigurationNetworkJson } from '../../../Store/Action/device/reader-configuration/reader-configuration-action'
import SystemStatus from '../summary/system-status'
import { FaMicrochip } from 'react-icons/fa'

export default function Network() {
    const dispatch = useDispatch()
    const reduxDevice = useSelector(state => state.DeviceReaderReducer)
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)

    useEffect(()=>{
        if(reduxReaderConfiguration?.readerLoginData?.message && reduxDevice?.doc!==null && reduxReaderConfiguration?.network === null){
            loadNetwork()
        }
    },[reduxReaderConfiguration])

    const loadNetwork = () =>{
        var json = { 
            token : reduxReaderConfiguration?.readerLoginData?.message,
            ip : reduxDevice?.doc?.readerIp,
        }
        HitApi(json, readerNetwork).then((result)=>{
            if(result){
                dispatch(setReaderConfigurationNetworkJson(result))
            }
        })
    }
    // 
  return (
    <div>
        <div className='my-3'><SystemStatus title={'Network Status'} data={reduxReaderConfiguration?.network} activeIcon={<FaMicrochip/>} /></div>
    </div>
  )
}
