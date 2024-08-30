import React, { useCallback } from 'react'
import CustomInput from '../../devices/component/form/custom-input'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { searchGeneral } from '../../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { setBrokersApiJson } from '../store/action/brokers/brokers-action'
import { Checkbox } from 'rizzui'
import CustomSwitcs from '../component/form/custum-switchs'

function AddBroker() {
  const reduxBrokers = useSelector(state => state.BrokersReducer)

  const dispatch = useDispatch()
  // const { errors, validate } = useValidation(addDeviceSchema);




  const handleCheckboxChange = (checked) => {
    const updatedJson = { ...reduxBrokers?.apiJson, isBrokerSecureConnection: checked };
    dispatch(setBrokersApiJson(updatedJson));
  };
  const handleOnChange = useCallback((e, name) => {
    const { _id, value } = e;
    console.log("e", e);
    var json = reduxBrokers?.apiJson
   if(name === 'brokerSecureConnectionType'){
    var newJson = {
      [name]: {
        "type": e?.label,
        "name": e?.value
      },
    }
   }
   else{
    var newJson = {
      [name]: value,
     
    }
   }

    Object.assign(json, newJson);
    dispatch(setBrokersApiJson(json));
  }, [dispatch, reduxBrokers?.apiJson]);

  console.log("reduxBrokers", reduxBrokers);

  return (
    <div className='bg-white p-10'>

      <div className='grid grid-cols-4 gap-4'>
        <SearchableSelect name="borkerType" label="Borker Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokertype' }} onChange={(e) => handleOnChange(e, 'borkertype')} />
        <CustomInput name="brokerIp" label="Broker Ip" value={reduxBrokers?.apiJson?.brokerIp} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} />
        <CustomInput name="brokerPort" label="Broker Port" value={reduxBrokers?.apiJson?.brokerPort} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} />
        <SearchableSelect type={'custom'} name="brokerSecureConnectionType" label="SecureConnection Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokerSecureConnectionType' }} onChange={(e) => handleOnChange(e, 'brokerSecureConnectionType')} />
        <CustomSwitcs name="isBrokerSecureConnection" label={'Broker Secure Connection'} value={reduxBrokers?.apiJson?.isBrokerSecureConnection} reduxState={reduxBrokers?.apiJson}  setAction={setBrokersApiJson} />

      </div>
    </div>
  )
}

export default AddBroker