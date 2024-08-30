import React, { useCallback, useState } from 'react'
import CustomInput from '../../../../Component/ui/form/input/custom-input'
import { setBrokersApiJson } from '../store/action/brokers/brokers-action'
import useValidation from '../../../../Hooks/useValidation';
import { brokerScheema } from '../schema/broker.schema';
import { useDispatch, useSelector } from 'react-redux';
import { addBroker, searchGeneral,searchBroker, updateBroker } from '../../../../Constant/Api/Api';
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect';
import CustomSwitch from '../../../../Component/ui/switch/custom-switch';
import CustomButton from '../../devices/component/form/custom-button';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { IoMdAddCircle } from "react-icons/io";
import { Colors } from '../../../../Constant/Colors/Color';
import MapableInput from '../../../../Component/ui/form/input/mapable-input';
import { setSearchableSelectSelectedData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';



function AddBroker() {
  const reduxBrokers = useSelector(state => state.BrokersReducer)
  const [loading, setLoading] = useState(false)
  const { errors, validate } = useValidation(brokerScheema);
  const dispatch = useDispatch()

  const _id = window.location.pathname.split('/')[4]


  if(_id !== undefined && Object.keys(reduxBrokers?.apiJson).length === 0){
    var json = {
      page:1,
      limit :1,
      search :{
        _id :_id
      }
    }
    HitApi(json, searchBroker).then((result) => {
      console.log("result_____", result);
      if(result?.content){
        dispatch(setBrokersApiJson(result?.content?.[0]));
        // var json = [{name:'brokerType',value:reduxBrokers?.apiJson?.brokerType}]
        // dispatch(setSearchableSelectSelectedData(json))

      }
     
    });
  }



  const handleOnChange = useCallback((e, name) => {
    const { _id, value } = e;
    console.log("e", e);
    var json = reduxBrokers?.apiJson
    if (name === 'brokerSecureConnectionType') {
      var newJson = {
        [name]: {
          "type": e?.label,
          "name": e?.value
        },
      }
    }
    else if( name === 'brokerCertificate'){
      var newJson = {
        [name]: [
          {
            "filePath": e?.label,
            "fileName": e?.value
          }
        ],
      }

    }
    else {
      var newJson = {
        [name]: value,

      }
    }

    Object.assign(json, newJson);
    dispatch(setBrokersApiJson(json));
  }, [dispatch, reduxBrokers?.apiJson]);

  console.log("reduxBrokers", reduxBrokers);
  const handleSubmit = () => {

    var json = reduxBrokers?.apiJson;

    console.log("json", json);

    const validationErrors = validate(json);

    console.log("validationErrors", validationErrors);
    if (Object.keys(validationErrors).length === 0) {
 const  apiToHit = _id ? updateBroker : addBroker
      setLoading(true);
      HitApi(json, apiToHit).then((result) => {
        console.log("result______", result);
        setLoading(false);
        if (result?.status === 200 || result?.status === 201) {
          alert(result.message);
          window.location.pathname = '/device-manager/broker';
        } else if (result?.status === 409) {
          alert(result?.error?.message);
        } else {
          alert(result.message);
        }
      });
    }
  }


  const addTopics = () => {
    const json = { ...reduxBrokers?.apiJson };
    const newTopic = {
      topicName: '',
      topicUsage: '',
      sendCommand: '',
      receiveCommand: '',
    };

    const newJson = {
      brokerTopics: [...(json.brokerTopics || []), newTopic],
    };

    Object.assign(json, newJson);
    dispatch(setBrokersApiJson(json));
  };

  const handleMapableInputChange =(value,name,index) =>{
    var oldJson = reduxBrokers?.apiJson
    oldJson.brokerTopics[index][name] = value
    dispatch(setBrokersApiJson(oldJson))
  }
  return (
    <div >
      <div className='bg-white mt-5 rounded-xl  p-10'>
        <div className='grid grid-cols-4 gap-4'>
          <CustomInput important={true} name="brokerIp" label="Broker Ip" value={reduxBrokers?.apiJson?.brokerIp} error={errors} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} validate={validate} />
          <SearchableSelect name="brokerType" label="Broker Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'brokertype'} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokertype' }} value={reduxBrokers?.apiJson?.roleName} error={errors} reduxState={reduxBrokers?.apiJson} onChange={(e) => handleOnChange(e, 'brokerType')} validate={validate} />
          <CustomInput important={true} name="brokerPort" label="Broker Port" value={reduxBrokers?.apiJson?.brokerPort} error={errors} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} validate={validate} />
          <SearchableSelect type={'custom'} name="brokerSecureConnectionType" label="SecureConnection Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokerSecureConnectionType' }} onChange={(e) => handleOnChange(e, 'brokerSecureConnectionType')} />
          <SearchableSelect type={'custom'} name="brokerCertificate" label="Broker Certificate" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ 'fieldName': 'brokerCertificate' }} onChange={(e) => handleOnChange(e, 'brokerCertificate')} />
          <CustomInput important={true} name="protocol" label="Broker Protocol" value={reduxBrokers?.apiJson?.protocol} error={errors} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} validate={validate} />
          <div className='mt-8'>
            <CustomSwitch name="isBrokerSecureConnection" label={'Broker Secure Connection'} value={reduxBrokers?.apiJson?.isBrokerSecureConnection} reduxState={reduxBrokers?.apiJson} setAction={setBrokersApiJson} />
          </div>
        </div>
      </div>
      {/* Toipcs */}
      <div>
        <div className='text-base text-black font-semibold flex items-center gap-x-5 mt-5'>
         <div>
         Topics
         </div>
        <div className='cursor-pointer' onClick={addTopics}>
        <IoMdAddCircle size={25} color={Colors.LOGINRED}/>
        </div>

        </div>
         {reduxBrokers?.apiJson?.brokerTopics?.map((item,i)=>{


          return (
          <div className='bg-white mt-5 rounded-xl  p-10' >
            {console.log(item,"vdvdd")}
              <div className='grid grid-cols-4 gap-4'>
                <MapableInput label="Topic Name"  defaultValue={item?.topicName} onChange={(e)=>handleMapableInputChange(e.target.value,'topicName',i)}/>
                <MapableInput label="Topic Usage"  defaultValue={item?.topicUsage}  onChange={(e)=>handleMapableInputChange(e.target.value,'topicUsage',i)}/>
                <MapableInput label="Receive Command"   defaultValue={item?.sendCommand}  onChange={(e)=>handleMapableInputChange(e.target.value,'sendCommand',i)}/>
                <MapableInput label="Receive Command"  defaultValue={item?.receiveCommand}   onChange={(e)=>handleMapableInputChange(e.target.value,'receiveCommand',i)}/>
          </div>
          </div>
          )
         })       
         }
      </div>
      <div className='flex gap-3 justify-end mt-10'>
        <CustomButton text={'Back'} onClick={() => { window.location.pathname = '/device-manager/broker' }} />
        <CustomButton type={'submit'} variant='solid' text={_id ? 'Update' :'Submit'} loading={loading} onClick={handleSubmit} />
      </div>

    </div>
  )
}

export default AddBroker