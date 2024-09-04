import React, { useEffect, useRef, useState } from 'react'
import useValidation from '../../../../Hooks/useValidation';
import CustomMapper from '../../../../Component/mapper/custom-mapper';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../devices/component/form/custom-input';
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect';
import { addMapper, searchConfig, searchGeneral } from '../../../../Constant/Api/Api';
import { setMappingApiJson, setMappingMappingJson } from '../../../../Store/Action/device-master/mapping/mapping-action';
import { addMappingSchema } from '../../../../Utils/validators/device-manager/mapping/add-mapping.schema';
import CustomButton from '../../../../Component/ui/buttons/custom-button';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';

const usedBy = [
  { _id: 0, label: 'device', value: 'device' },
  { _id: 0, label: 'gps', value: 'gps' },
  { _id: 0, label: 'reader', value: 'reader' },
]
export default function AddMapper() {
  const reduxMapping = useSelector(state => state.MappingReducer)
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const [input, setInput] = useState({
    "antennas": {
        "1": "disconnected",
        "2": "disconnected",
        "3": "disconnected",
        "4": "connected"
    },
    "cpu": {
        "system": 9,
        "user": 2
    },
    "flash": {
        "platform": {
            "free": 8826880,
            "total": 33554432,
            "used": 24727552
        },
        "readerConfig": {
            "free": 3153920,
            "total": 4194304,
            "used": 1040384
        },
        "readerData": {
            "free": 63856640,
            "total": 67108864,
            "used": 3252224
        },
        "rootFileSystem": {
            "free": 36573184,
            "total": 192937984,
            "used": 156364800
        }
    },
    "interfaceConnectionStatus": {
        "data": [
            {
                "connectionError": "connection initialization failed with return code (255), retry count (0)",
                "connectionStatus": "disconnected",
                "description": "hindalco",
                "interface": "headup_config"
            }
        ]
    },
    "ntp": {
        "offset": 0.0,
        "reach": 0
    },
    "powerNegotiation": "DISABLED",
    "powerSource": "DC",
    "radioActivity": "active",
    "radioConnection": "connected",
    "ram": {
        "free": 99651584,
        "total": 252329984,
        "used": 152678400
    },
    "systemTime": "2024-09-04T18:09:01Z",
    "temperature": 46,
    "uptime": "21:12:33"
})
  const [mapping, setMapping] = useState([
    {
      "valueName": "code",
      "data": "statusCode",
      "dataType": "int"
    }
  ])
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

  const SaveConfiguration = () => {
    var json = reduxMapping?.apiJson
    const validationErrors = validate(json);
    console.log('final submit json', validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      Object.assign(json, {
        input:  input?.length>0?input:[input],
        mapping: mapping?.length>0?mapping:[mapping],
        output: output?.length>0?output:[output],
      })

    }

    console.log('json====', json);

    HitApi(json, addMapper).then((res)=>{
      console.log('res', res);
    })

  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        <CustomInput validate={validate} name="mapperName" label="Mapper Name" value={reduxMapping?.apiJson?.mapperName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} />
        <SearchableSelect validate={validate} name="useFor" label="Load Configuration" api={searchConfig} getFieldName={'configName'} value={reduxMapping?.apiJson?.roleName} error={errors} reduxState={reduxMapping?.apiJson} setAction={setMappingApiJson} onChange={handleCustomChange} />
      </div>
      {mapping && <div><CustomMapper input={input} setInput={setInput} mapping={mapping} setMapping={setMapping} output={output} setOutput={setOutput} /></div>}
      {output && <div><CustomButton type={'submit'} text={'Save Configuration'} onClick={SaveConfiguration} /></div>}
    </div>
  )
}
