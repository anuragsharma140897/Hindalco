import React from 'react'
import CustomJsonEditor from './component/json-editor/custom-json-editor'
import CustomInput from './component/form/custom-input'
import CustomSelect from './component/form/custom-select'
import { useDispatch, useSelector } from 'react-redux'
import { setInputJson, setMapperApiJson, setMappingJson, setOutputJson } from './store/action/editor/editor-action'
import CustomButton from './component/form/custom-button'
import { CompileConfiguration } from './promiss/mapper-promiss'
import useValidation from './hook/use-validation'
import { mapperSchema } from './schema/mapper.schema'
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect'
import { searchGeneral } from '../../../Constant/Api/Api'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { addMapper } from './constants/constants'
import CustomMapper from '../../../Component/mapper/custom-mapper'

const usedBy = [
  { _id: 0, label: 'device', value: 'device' },
  { _id: 0, label: 'gps', value: 'gps' },
  { _id: 0, label: 'reader', value: 'reader' },
]

export default function Mapper({input, mapping, setResult}) {
  const dispatch = useDispatch();
  const reduxJson = useSelector(state => state.EditorReducer);
  const { errors, validate } = useValidation(mapperSchema);
  // const [output, setDat]
  // const { showCustomAlert } = useAlertController();

  const onChange = (value, type) => {
    try {
      const parsedJson = JSON.parse(value);
      if (type === 'input') {
        dispatch(setInputJson(parsedJson));
      } else if (type === 'mapping') {
        dispatch(setMappingJson(parsedJson));
      } else if (type === 'output') {
        dispatch(setOutputJson(parsedJson));
      }
    } catch (error) {
      console.error('Invalid JSON format:', error.message);
    }
  };

  const GenerateOutput = (e) => {
    const { input, mapping, apiJson } = reduxJson || {};
    var json = apiJson
    const validationErrors = validate(json);
    if (Object.keys(validationErrors).length === 0) {
      CompileConfiguration(mapping, input).then((CompiledData) => {
        if (CompiledData) {
          console.log('CompiledData', CompiledData);
          dispatch(setOutputJson(CompiledData))
        }
      })
    }
  };

  

  const handleSelectChange = (e) => {
    var json = reduxJson?.apiJson
    const { _id, value } = e
    Object.assign(json, { useFor: value })
    dispatch(setMapperApiJson(json))
  }

  return (
    <div>
      <form >
        <div className='grid grid-cols-4 gap-4'>
          {/* <div> <CustomInput validate={validate} name={'mapperName'} label={'Mapper Name'} value={reduxJson?.apiJson?.mapperName} error={errors} reduxState={reduxJson?.apiJson} setAction={setMapperApiJson} /></div>
          <div><SearchableSelect validate={validate} name="useFor" label="Use For" api={searchGeneral} dynamicSearch={{'fieldName':'mapperUseFor'}} getFieldName={'value'} value={reduxJson?.apiJson?.roleName} error={errors} reduxState={reduxJson?.apiJson} setAction={setMapperApiJson} onChange={handleSelectChange} /></div> */}
        </div>
        {/* <div className='my-6'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='font-bold'>Input JSON</label>
              <CustomJsonEditor json={reduxJson?.input} onChange={(value) => onChange(value, 'input')} />
            </div>
            <div>
              <label className='font-bold'>Configuraiton</label>
              <CustomJsonEditor json={reduxJson?.mapping} onChange={(value) => onChange(value, 'mapping')} />
            </div>
            <div>
              <label className='font-bold'>Output JSON</label>
              <CustomJsonEditor json={reduxJson?.output} onChange={(value) => onChange(value, 'output')} />
            </div>
          </div>
        </div> */}
        <CustomMapper input={reduxJson?.input} mapping={reduxJson?.mapping}/>
        <div><CustomButton title={'Generate Output'} onClick={GenerateOutput} /></div>
        <div><CustomButton type={'submit'} title={'Save Configuration'} onClick={SaveConfiguration} /></div>
      </form>
    </div>
  )
}
