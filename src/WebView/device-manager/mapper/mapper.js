import React from 'react'
import CustomJsonEditor from './component/json-editor/custom-json-editor'
import CustomInput from './component/form/custom-input'
import CustomSelect from './component/form/custom-select'
import { useDispatch, useSelector } from 'react-redux'
import { setConfigJson, setInputJson, setMapperApiJson, setOutputJson } from './store/action/editor/editor-action'
import CustomButton from './component/form/custom-button'
import { CompileConfiguration } from './promiss/mapper-promiss'
import useValidation from './hook/use-validation'
import { mapperSchema } from './schema/mapper.schema'

const usedBy = [
  { id: 0, label: 'device', value: 'device' },
  { id: 0, label: 'gps', value: 'gps' },
  { id: 0, label: 'reader', value: 'reader' },
]

export default function Mapper() {
  const dispatch = useDispatch();
  const reduxJson = useSelector(state => state.EditorReducer);
  const { errors, validate } = useValidation(mapperSchema);
  // const { showCustomAlert } = useAlertController();

  const onChange = (value, type) => {
    try {
      const parsedJson = JSON.parse(value);
      if (type === 'input') {
        dispatch(setInputJson(parsedJson));
      } else if (type === 'config') {
        dispatch(setConfigJson(parsedJson));
      } else if (type === 'output') {
        dispatch(setOutputJson(parsedJson));
      }
    } catch (error) {
      console.error('Invalid JSON format:', error.message);
    }
  };

  const handleSubmit = (e) => {
    const { inputJson, outputJson, config, apiJson } = reduxJson || {};
    var json = apiJson

    console.log('json', json);

    const validationErrors = validate(json);

    console.log('validationErrors', validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      CompileConfiguration(config, inputJson).then((CompiledData) => {
        if (CompiledData) {
          console.log('CompiledData', CompiledData);
          dispatch(setOutputJson(CompiledData))
        }
      })
    }
    
  };

  const handleSelectChange = (e) => {
    var json = reduxJson?.apiJson
    const { id, value } = e
    Object.assign(json, { usedBy: value })
    dispatch(setMapperApiJson(json))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-4 gap-4'>
          <div> <CustomInput validate={validate} name={'mapperName'} label={'Mapper Name'} value={reduxJson?.apiJson?.mapperName} error={errors} reduxState={reduxJson?.apiJson} setAction={setMapperApiJson} /></div>
          <div> <CustomSelect validate={validate} name={'usedBy'} label={'Used By'} options={usedBy} error={errors} searchable={false} reduxState={reduxJson?.apiJson} setAction={setMapperApiJson} onChange={handleSelectChange} /></div>
        </div>
        <div className='my-6'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='font-bold'>Input JSON</label>
              <CustomJsonEditor json={reduxJson?.inputJson} onChange={(value) => onChange(value, 'input')} />
            </div>
            <div>
              <label className='font-bold'>Configuraiton</label>
              <CustomJsonEditor json={reduxJson?.config} onChange={(value) => onChange(value, 'config')} />
            </div>
            <div>
              <label className='font-bold'>Output JSON</label>
              <CustomJsonEditor json={reduxJson?.outputJson} onChange={(value) => onChange(value, 'output')} />
            </div>
          </div>
        </div>
        <div><CustomButton type={'submit'} title={'Save Configuraiton'} onClick={handleSubmit} /></div>
      </form>
    </div>
  )
}
