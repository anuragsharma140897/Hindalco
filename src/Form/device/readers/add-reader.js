import React, { useEffect } from 'react';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { productMasterSchema } from '../../../Utils/validators/master/product-master/add-product.schema';
import { useDispatch, useSelector } from 'react-redux';
import { setProductMasterApiJson } from '../../../Store/Action/master/product-master/product-master-action';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomSwitch from '../../../Component/ui/switch/custom-switch';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addProduct, addReader, searchGeneral, searchProduct, searchReader, updateProduct, updateReader } from '../../../Constant/Api/Api';
import { CompileProductMaster } from '../../../WebView/master/product-master/promiss/product-master.promiss';
import { setDeviceReaderApiJson } from '../../../Store/Action/device/device-reader/device-reader-action';
import { CompileDeviceReader } from '../../../WebView/master/reader-master/promiss/device-reader.promiss';
import { deviceReaderSchema } from '../../../Utils/validators/device/device-reader/create-device-reader.schema';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import useAlertController from '../../../Hooks/use-alert-controller';
import useDynamicLoading from '../../../Hooks/use-dynamic-loading';

export default function CreateDeviceReader() {

  const dispatch = useDispatch()
  const { errors, validate } = useValidation(deviceReaderSchema);
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  const { showCustomAlert } = useAlertController();
  const { loadingState, setDynamicLoading } = useDynamicLoading();
  var url = window.location.pathname
  var ID = url?.split('/')[4]

  useEffect(() => {
    if (ID && !reduxDevice?.apiJson?._id) {
      loadDefault(ID)
    }
  }, [])

  const loadDefault = () => {
    var json = reduxDevice?.searchJson
    json.search._id = ID
    HitApi(json, searchReader).then((result) => {
      if (result) {
        CompileDeviceReader(result).then((CompiledData) => {
          if (CompiledData?.content?.length === 1) {
            dispatch(setDeviceReaderApiJson(CompiledData?.content?.[0]))
          }
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var json = reduxDevice?.apiJson
    const validationErrors = validate(json);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with your logic if there are no validation errors
      setDynamicLoading({reader:true})
      if (ID) {
        Object.assign(json, { _id: ID })
        HitApi(json, updateReader).then((result) => {
          if (result.success !== false) {
            showCustomAlert({
              type: 'success',
              title: 'Success!',
              message: 'Reader Details Updated Successfully',
            });
          }
        })
      } else {
        Object.assign(json, { status: json?.status || 'active' })
        HitApi(json, addReader).then((result) => {
          if (result.success !== false) {
            showCustomAlert({
              type: 'success',
              title: 'Success!',
              message: 'Reader Details Added Successfully',
            });
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
        })
      }
      setDynamicLoading({reader:false})
      window.location.href = '/device/reader'
    }
  };

  const handleChange = (e, fieldName, no) => {
    const { _id, label, value } = e
    var json = reduxDevice?.apiJson


    var ts = {
      [fieldName]: {
        "antennaNumber": no,
        "antennaAction": value,
        "antennaStatus": "Disconnected"
      },
    }
    Object.assign(json, ts)
  }

  return (
    <div className='p-10 bg-white rounded-xl'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 lg:space-y-6">
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput validate={validate} name="placementName" label="Placement Name" value={reduxDevice?.apiJson?.placementName} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="readerTypeName" label="Reader Type Name" value={reduxDevice?.apiJson?.readerTypeName} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="readerAction" label="Reader Action" value={reduxDevice?.apiJson?.readerAction} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="frequency" label="Frequency" value={reduxDevice?.apiJson?.frequency} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="port" label="Port" value={reduxDevice?.apiJson?.port} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="status" label="Status" value={reduxDevice?.apiJson?.status} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} hide={!ID} />
            <CustomInput validate={validate} name="readerInfo" label="Reader Info" value={reduxDevice?.apiJson?.readerInfo} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="serialNo" label="Serial No" value={reduxDevice?.apiJson?.serialNo} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="bulidingId" label="Building ID" value={reduxDevice?.apiJson?.bulidingId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} hide={!ID} />
            <CustomInput validate={validate} name="zoneId" label="Zone ID" value={reduxDevice?.apiJson?.zoneId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} hide={!ID} />
            <CustomInput validate={validate} name="macId" label="MAC ID" value={reduxDevice?.apiJson?.macId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="readerIp" label="Reader IP" value={reduxDevice?.apiJson?.readerIp} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="weighingScaleId" label="Weighing Scale ID" value={reduxDevice?.apiJson?.weighingScaleId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} hide={!ID} />
            <CustomInput validate={validate} name="readerUsername" label="Reader Username" value={reduxDevice?.apiJson?.readerUsername} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput validate={validate} name="readerPassword" label="Reader Password" value={reduxDevice?.apiJson?.readerPassword} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <SearchableSelect validate={validate} name="antenna1" label="Antenna 1" className={'uppercase'} api={searchGeneral} dynamicSearch={{ 'fieldName': 'antenna' }} getFieldName={'value'} value={reduxDevice?.apiJson?.antenna1} error={errors} reduxState={reduxDevice?.apiJson} onChange={(e) => handleChange(e, 'antenna1', 1)} />
            <SearchableSelect validate={validate} name="antenna2" label="Antenna 2" className={'uppercase'} api={searchGeneral} dynamicSearch={{ 'fieldName': 'antenna' }} getFieldName={'value'} value={reduxDevice?.apiJson?.antenna2} error={errors} reduxState={reduxDevice?.apiJson} onChange={(e) => handleChange(e, 'antenna2', 2)} />
            <SearchableSelect validate={validate} name="antenna3" label="Antenna 3" className={'uppercase'} api={searchGeneral} dynamicSearch={{ 'fieldName': 'antenna' }} getFieldName={'value'} value={reduxDevice?.apiJson?.antenna3} error={errors} reduxState={reduxDevice?.apiJson} onChange={(e) => handleChange(e, 'antenna3', 3)} />
            <SearchableSelect validate={validate} name="antenna4" label="Antenna 4" className={'uppercase'} api={searchGeneral} dynamicSearch={{ 'fieldName': 'antenna' }} getFieldName={'value'} value={reduxDevice?.apiJson?.antenna4} error={errors} reduxState={reduxDevice?.apiJson} onChange={(e) => handleChange(e, 'antenna4', 4)} />
          </div>

          <div className='flex items-center justify-center gap-x-2' >
            {loadingState?.doc?.reader ? <CustomButton variant='flat' text={'Loading...'} /> : <CustomButton text={'Back'} variant='flat' className={''} onClick={() => window.location.pathname = '/device/reader'} />}
            {loadingState?.doc?.reader ? <CustomButton type={'submit'} text={'Loading...'} /> : <CustomButton type={'submit'} className={''} text={ID ? 'Update' : 'Submit'} />}

          </div>
        </div>
      </form>
    </div>
  )
}