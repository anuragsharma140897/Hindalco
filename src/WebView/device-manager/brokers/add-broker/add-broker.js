import React, { useCallback } from 'react'
import CustomInput from '../../devices/component/form/custom-input'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { searchGeneral } from '../../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { setBrokersApiJson } from '../store/action/brokers/brokers-action'
import { Checkbox } from 'rizzui'

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
    // const newJson = { [name]: value };
    // const updatedJson = { ...reduxBrokers?.apiJson, ...newJson };
    // dispatch(setBrokersApiJson(updatedJson));
  }, [dispatch, reduxBrokers?.apiJson]);

  console.log("reduxBrokers", reduxBrokers);

  return (
    <div className='bg-white p-10'>

      <div className='grid grid-cols-4 gap-4'>
        <SearchableSelect name="borkerType" label="Borker Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokertype' }} onChange={(e) => handleOnChange(e, 'borkertype')} />
        <CustomInput name="brokerIp" label="Broker Ip" value={reduxBrokers?.apiJson?.brokerIp} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} />
        <CustomInput name="brokerPort" label="Broker Port" value={reduxBrokers?.apiJson?.brokerPort} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} />
        <SearchableSelect type={'custom'} name="brokerSecureConnectionType" label="Borker SecureConnection Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokerSecureConnectionType' }} onChange={(e) => handleOnChange(e, 'brokerSecureConnectionType')} />
        <div className="flex items-center space-x-2">
  <Checkbox 
    id="isBrokerSecureConnection"
    checked={reduxBrokers?.apiJson?.isBrokerSecureConnection || false}
    onCheckedChange={handleCheckboxChange}
  />
  <label 
    htmlFor="isBrokerSecureConnection" 
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Is Broker Secure Connection
  </label>
</div>        />
      </div>





    </div>
  )
}

export default AddBroker