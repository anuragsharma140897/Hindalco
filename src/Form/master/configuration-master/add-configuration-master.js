import React, { useEffect } from 'react'
import ConfigTabs from '../../../WebView/master/configuration-master/config-tabs'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { CompileConfigurationMaster } from './compileConfigurationMaster'
import { setConfigurationMasterApiJson } from '../../../Store/Action/master/configuration-master/configuration-master-action'
import { useDispatch, useSelector } from 'react-redux'
import { searchMqttConfig } from '../../../Constant/Api/Api'

function AddConfigurationMaster() {

  const reduxConfiguration = useSelector(state => state.ConfigurationMasterReducer)
  const dispatch = useDispatch()

  var url = window.location.pathname
  var ID = url.split('/')[4]

  useEffect(() => {
    if (ID && !reduxConfiguration?.apiJson?.id && url.split('/')[3] === 'edit') {
      loadDefault(ID)
    }
  }, [])

  const loadDefault = () => {
    var json = reduxConfiguration?.searchJson
    json.search._id = ID
    HitApi(json, searchMqttConfig).then((result) => {
      if (result) {
        console.log('result', result);
        CompileConfigurationMaster(result?.content?.[0]).then((CompiledData) => {
          if (CompiledData) {
            dispatch(setConfigurationMasterApiJson(CompiledData))
          }
        })
      }
    })
  }

  return (
    <div>
      <ConfigTabs ID={ID}/>
    </div>
  )
}

export default AddConfigurationMaster