import React, { useEffect, useState } from 'react'
import CustomButton from '../../../../Component/ui/buttons/custom-button'
import CustomInput from '../../../../Component/ui/form/input/custom-input'
import { useDispatch, useSelector } from 'react-redux'
import { setConfigurationJson } from '../../../../Store/Action/device-master/configuration/configuration-action'
import useValidation from '../../../../Hooks/useValidation'
import { addConfigurationSchema } from '../../../../Utils/validators/device-manager/configuration/add-configuration.schema'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { addConfig, searchGeneral } from '../../../../Constant/Api/Api'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import CustomJsonEditor from '../../../../Component/ui/editor/json-editor'

export default function AddConfiguration() {
  const dispatch = useDispatch()
  const reduxConfiguration = useSelector(state => state.ConfigurationReducer)
  const [input, setInput] = useState({
    "deviceId": "",
    "deviceType": "",
    "timestamp": "",
    "timeInterval": "",
    "rawData": {
      "epcid":"",
      "locaiton":"",
      "readerDetails":"",
      
    },
    "mapperId": ""
  })
  const [output, setOutput] = useState()
  const { errors, validate } = useValidation(addConfigurationSchema);

  console.log('reduxConfiguration', reduxConfiguration);

  useEffect(()=>{

  },[input])

  const handleSave = () => {
    var json = reduxConfiguration?.apiJson

    Object.assign(json, {
      config: [input],

    })

    HitApi(json, addConfig).then((Res) => {
      console.log('Res = ', Res);
    })

    console.log(json);
  }

  const handleCustomChange = (e) => {
    var json = reduxConfiguration?.apiJson
    const { _id, value } = e
    Object.assign(json, { useFor: value })
    dispatch(setConfigurationJson(json))

  }

  const onChange = (value, type) => {

    console.log('value', value);

    try {
        const parsedJson = (value);
        if (type === 'input') {
            setInput(parsedJson);

        }
    } catch (error) {
        console.error('Invalid JSON format:', error.message);
    }
};


  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        <CustomInput validate={validate} name="configName" label="Configuraiton Name" value={reduxConfiguration?.apiJson?.configName} error={errors} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationJson} />
        <SearchableSelect name="useFor" label="Use For" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'usedBy': 'defaultData' }} value={reduxConfiguration?.apiJson?.roleName} error={errors} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationJson} onChange={handleCustomChange} />

      </div>
      {/* <CustomButton variant='flat' text={'Load Default'} onClick={loadDefault} /> */}
      <CustomJsonEditor json={input} onChange={(value) => onChange(value, 'input')} />
      <div className='my-4'>
        <CustomButton text={'Save Configuration'} onClick={handleSave} />
      </div>
    </div>
  )
}
