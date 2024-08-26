import React, { useEffect, useState } from 'react'
import Navigation from './navigation'
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { searchReader, loginReader } from '../../Constant/Api/Api';
import { setReaderConfigurationLoginData } from '../../Store/Action/device/reader-configuration/reader-configuration-action';
import DeviceStatus from './device-status';
import { setDeviceReaderData } from '../../Store/Action/device/device-reader/device-reader-action';

export default function ReaderConfiguraiton() {
  const dispatch = useDispatch()
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(Date.now());

  var url = window.location.pathname
  var ID = url.split('/')[4]

  useEffect(() => {
    if (ID && !reduxDevice?.apiJson?.id && reduxReaderConfiguration?.readerLoginData === null) {
      // loadDefault(ID)
    }
  }, [loading,render])


  const loadDefault = () => {
    var json = reduxDevice?.searchJson
    json.search.id = ID
    setLoading(true)

    console.log('json', json);

    HitApi(json, searchReader).then((result) => {

      console.log('result', result);

      if (result?.content?.[0]) {
        dispatch(setDeviceReaderData(result?.content?.[0]))
        CheckConnection(result?.content?.[0])
      }
    })
  }

  const CheckConnection = (row) => {
    var json = {
      "ip": row?.readerIp,
      "username": row?.readerUsername,
      "password": row?.readerPassword,
    }

    HitApi(json, loginReader).then((result) => {
      setLoading(false)
      if (result) {
        if(result?.message === "An error occurred during the API call."){
          setLoading(false)
          setRender(Date.now())
          dispatch(setReaderConfigurationLoginData(null))
        }
        else{
          Object.assign(result, {lastActive : Date.now()})
          dispatch(setReaderConfigurationLoginData(result))
        }
      }
    })

  }


  return (
    <div>
      <div className='my-4'><DeviceStatus loading={loading} /></div>
      <Navigation />
    </div>
  )
}
