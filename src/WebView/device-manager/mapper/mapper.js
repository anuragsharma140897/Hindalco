import React, { useEffect, useRef, useState } from 'react'
import useValidation from '../../../Hooks/useValidation';
import CustomMapper from '../../../Component/mapper/custom-mapper';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../devices/component/form/custom-input';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { searchConfig, searchGeneral } from '../../../Constant/Api/Api';
import { setMappingApiJson, setMappingMappingJson } from '../../../Store/Action/device-master/mapping/mapping-action';
import { addMappingSchema } from '../../../Utils/validators/device-manager/mapping/add-mapping.schema';
import CustomButton from '../../../Component/ui/buttons/custom-button';


const usedBy = [
  { id: 0, label: 'device', value: 'device' },
  { id: 0, label: 'gps', value: 'gps' },
  { id: 0, label: 'reader', value: 'reader' },
]
export default function Mapper() {
  const reduxMapping = useSelector(state => state.MappingReducer)
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const [input, setInput] = useState({ "page": 1, "apiName": "/url" })
  const [mapping, setMapping] = useState(null)
  const [output, setOutput] = useState(null)
  const { errors, validate } = useValidation(addMappingSchema);

  useEffect(() => {
    console.log('mapping ******', mapping);

  }, [reduxMapping, mapping, output, input])

  const handleCustomChange = (e) => {
    let { label, value, index } = e
    var json = reduxMapping?.apiJson
    Object.assign(json, { useFor: value })
    var findConfig = reduxSelect?.doc?.[index];
    console.log('findConfig?.config?.[0]', findConfig?.config?.[0]);
    if (findConfig?.config?.length > 0) {
      var parsed = findConfig?.config?.[0]
      setMapping(parsed)
      setOutput(null)
    }
  };

  const SaveConfiguration = () =>{
    var json = reduxMapping?.apiJson
    Object.assign(json,{
      input : [input],
      mapping : [mapping],
      output : [output],
    })

    console.log('final submit json', json);
    
    // HitApi(json, addMapper).then((res)=>{
    //   console.log('res', res);
    // })

  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        <CustomInput validate={validate} name="mapperName" label="Mapper Name" value={reduxMapping?.apiJson?.mapperName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} />
        <SearchableSelect name="useFor" label="Load Configuration" api={searchConfig} getFieldName={'configName'} value={reduxMapping?.apiJson?.roleName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} onChange={handleCustomChange} />
      </div>
      {mapping && <div><CustomMapper input={input} setInput={setInput} mapping={mapping} setMapping={setMapping} output={output} setOutput={setOutput} /></div>}
      {output && <div><CustomButton type={'submit'} text={'Save Configuration'} onClick={SaveConfiguration} /></div>}
    </div>
  )
}
