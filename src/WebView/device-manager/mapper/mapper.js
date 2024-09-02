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
  const dispatch = useDispatch()
  const editorRef = useRef(null);
  const reduxMapping = useSelector(state => state.MappingReducer)
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const [input, setInput] = useState({ "page": 1 })
  const [mapping, setMapping] = useState({ "page": "page" })
  const [output, setOutput] = useState()
  const { errors, validate } = useValidation(addMappingSchema);

  useEffect(()=>{
    console.log('reduxMapping', reduxMapping?.mappingJson);

  },[reduxMapping])

  const handleSave = () => {
    var json = reduxMapping?.apiJson

    // HitApi(json, addConfig).then((Res)=>{
    //   console.log('Res = ', Res);
    // })
  }

  const handleCustomChange = (e) => {
    var json = reduxMapping?.apiJson;
    dispatch(setMappingMappingJson(null))
    const { id, value, index } = e;

    Object.assign(json, { useFor: value });

    dispatch(setMappingApiJson(json));

    var findConfig = reduxSelect?.doc?.[index];

    if (findConfig) {
      setMapping(findConfig.config?.[0]);
      dispatch(setMappingMappingJson(findConfig.config?.[0]))
    }
  };

  const clearData = () =>{
    console.log('editorRef', editorRef);
  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        <CustomInput validate={validate} name="mapperName" label="Mapper Name" value={reduxMapping?.apiJson?.mapperName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} />
        <SearchableSelect name="useFor" label="Load Configuration" api={searchConfig} getFieldName={'configName'} value={reduxMapping?.apiJson?.roleName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} onChange={handleCustomChange} />
        {/* <SearchableSelect name="useFor" label="Use For" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'suppliergroup' }} value={reduxMapping?.apiJson?.roleName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} onChange={handleCustomChange} /> */}
      </div>
      {reduxMapping?.mappingJson && <div><CustomMapper input={input} mapping={reduxMapping?.mappingJson} setOutput={setOutput} output={output} /></div>}

    </div>
  )
}
