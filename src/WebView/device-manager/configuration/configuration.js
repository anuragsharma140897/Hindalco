import React, { useState } from 'react'
import CustomConfiguration from '../../../Component/configuration/custom-configuration'
import CustomButton from '../../../Component/ui/buttons/custom-button'
import CustomInput from '../../../Component/ui/form/input/custom-input'
import { useDispatch, useSelector } from 'react-redux'
import { setConfigurationJson } from '../../../Store/Action/device-master/configuration/configuration-action'
import useValidation from '../../../Hooks/useValidation'
import { addConfigurationSchema } from '../../../Utils/validators/device-manager/configuration/add-configuration.schema'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { addConfig, searchGeneral } from '../../../Constant/Api/Api'
import { HitApi } from '../../../Store/Action/Api/ApiAction'

export default function Configuration() {
  const dispatch = useDispatch()
  const reduxConfiguration = useSelector(state => state.ConfigurationReducer)
  const [input, setInput] = useState({ "page": 1 })
  const [output, setOutput] = useState()
  const { errors, validate } = useValidation(addConfigurationSchema);

  console.log('reduxConfiguration', reduxConfiguration);

  const handleSave = () => {
    var json = reduxConfiguration?.apiJson

    Object.assign(json, {
      config: [output],

    })

    HitApi(json, addConfig).then((Res)=>{
      console.log('Res = ', Res);
    })

    console.log(json);
  }

  const handleCustomChange = (e) =>{
    var json = reduxConfiguration?.apiJson
    const { id, value } = e
    Object.assign(json, { useFor: value })
    dispatch(setConfigurationJson(json))

  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        <CustomInput validate={validate} name="configName" label="Confuguraiton Name" value={reduxConfiguration?.apiJson?.configName} error={errors} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationJson} />
        <SearchableSelect name="useFor" label="Use For" api={searchGeneral} getFieldName={'value'} dynamicSearch={{'fieldName':'mapperUseFor'}} value={reduxConfiguration?.apiJson?.roleName} error={errors} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationJson} onChange={handleCustomChange}/>
      </div>
      <CustomConfiguration input={input} output={output} setOutput={setOutput} />
      <div className='my-4'>
        <CustomButton text={'Save Configuration'} onClick={handleSave} />
      </div>
    </div>
  )
}
