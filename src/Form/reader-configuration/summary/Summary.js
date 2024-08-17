import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { readerStatus } from '../../../Constant/Api/Api'

import SystemStatus from './system-status';
import { setReaderConfigurationSummaryJson } from '../../../Store/Action/device/reader-configuration/reader-configuration-action';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import { FaMicrochip } from 'react-icons/fa';

export default function Summary() {
    const dispatch = useDispatch()
    const reduxDevice = useSelector(state => state.DeviceReaderReducer)
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)

    useEffect(()=>{
        if(reduxReaderConfiguration?.readerLoginData?.message && reduxDevice?.doc!==null && reduxReaderConfiguration?.summary === null){
            loadSummary()
        }

        console.log('reduxReaderConfiguration', reduxReaderConfiguration);

    },[reduxReaderConfiguration])

    const loadSummary = () =>{
        var json = { 
            token : reduxReaderConfiguration?.readerLoginData?.message,
            ip : reduxDevice?.doc?.readerIp,
        }

        console.log('json : ', json);

        HitApi(json, readerStatus).then((result)=>{

            console.log('result', result);

            if(result){
                dispatch(setReaderConfigurationSummaryJson(result))
            }
        })
    }
    // 


    return (
        <div>
            <div className='my-3'><SystemStatus title={'Antennas'} data={reduxReaderConfiguration?.summary?.antennas} activeIcon={<FiWifi className="text-green-500" />} InactiveIcon={<FiWifiOff className="text-red-500" />}/></div>
            <div className='my-3'><SystemStatus title={'CPU'} data={reduxReaderConfiguration?.summary?.cpu} activeIcon={<FaMicrochip/>} /></div>
            <div className='my-3'><SystemStatus title={'MQTT Connection'} data={reduxReaderConfiguration?.summary?.interfaceConnectionStatus?.data?.[0]} activeIcon={<FaMicrochip/>} /></div>
            <div className='my-3'><SystemStatus title={'RAM'} data={reduxReaderConfiguration?.summary?.ram} activeIcon={<FaMicrochip/>} /></div>
            {/* <div className='my-3'><SystemStatus title={'MQTT Connection'} data={reduxReaderConfiguration?.summary?.interfaceConnectionStatus?.data?.[0]} activeIcon={<FaMicrochip/>} /></div> */}
        </div>
    )
}
