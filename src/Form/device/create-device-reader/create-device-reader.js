import React, { useEffect } from 'react';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { productMasterSchema } from '../../../Utils/validators/master/product-master/add-product.schema';
import { useDispatch, useSelector } from 'react-redux';
import { setProductMasterApiJson } from '../../../Store/Action/master/product-master/product-master-action';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomSwitch from '../../../Component/ui/switch/custom-switch';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addProduct, addReader, searchProduct, searchReader, updateProduct, updateReader } from '../../../Constant/Api/Api';
import { CompileProductMaster } from '../../../WebView/master/product-master/promiss/product-master.promiss';
import { setDeviceReaderApiJson } from '../../../Store/Action/device/device-reader/device-reader-action';
import { CompileDeviceReader } from '../../../WebView/master/reader-master/promiss/device-reader.promiss';
import { deviceReaderSchema } from '../../../Utils/validators/device/device-reader/create-device-reader.schema';

export default function CreateDeviceReader() {

  const dispatch = useDispatch()
  const { errors, validate } = useValidation(deviceReaderSchema);
  const reduxDevice = useSelector(state => state.DeviceReaderReducer)
  var url = window.location.pathname
  var ID = url.split('/')[4]

  useEffect(() => {
    if (ID && !reduxDevice?.apiJson?.id) {
      loadDefault(ID)
    }
  }, [])

  const loadDefault = () => {
    var json = reduxDevice?.searchJson
    json.search.id = ID
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
    if (!json.captureBatchNo) {
      json.captureBatchNo = false
    }
    if (!json.captureLotNo) {
      json.captureLotNo = false
    }
    const validationErrors = validate(json);
    if (Object.keys(validationErrors).length === 0) {
      if (ID) {
        Object.assign(json, { id: ID })
        HitApi(json, updateReader).then((result) => {
          if (result.status === 200) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/device/reader'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
        })
      } else {
        Object.assign(json, { status: json?.status || 'active' })
        HitApi(json, addReader).then((result) => {
          if (result.status === 200) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/device/reader'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
        })
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className='p-10 bg-white rounded-xl'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 lg:space-y-6">
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="placementName" label="Placement Name" value={reduxDevice?.apiJson?.placementName} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerTypeName" label="Reader Type Name" value={reduxDevice?.apiJson?.readerTypeName} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerAction" label="Reader Action" value={reduxDevice?.apiJson?.readerAction} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="frequency" label="Frequency" value={reduxDevice?.apiJson?.frequency} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="port" label="Port" value={reduxDevice?.apiJson?.port} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="status" label="Status" value={reduxDevice?.apiJson?.status} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerInfo" label="Reader Info" value={reduxDevice?.apiJson?.readerInfo} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="serialNo" label="Serial No" value={reduxDevice?.apiJson?.serialNo} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="bulidingId" label="Building ID" value={reduxDevice?.apiJson?.bulidingId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="zoneId" label="Zone ID" value={reduxDevice?.apiJson?.zoneId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="macId" label="MAC ID" value={reduxDevice?.apiJson?.macId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerIp" label="Reader IP" value={reduxDevice?.apiJson?.readerIp} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weighingScaleId" label="Weighing Scale ID" value={reduxDevice?.apiJson?.weighingScaleId} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerUsername" label="Reader Username" value={reduxDevice?.apiJson?.readerUsername} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
            <CustomInput name="readerPassword" label="Reader Password" value={reduxDevice?.apiJson?.readerPassword} error={errors} reduxState={reduxDevice?.apiJson} setAction={setDeviceReaderApiJson} />
          </div>
          <div className='flex items-center justify-center gap-x-2' >
            <CustomButton text={'Back'} variant='flat' className={''} onClick={() => window.location.pathname = '/device/reader'} />
            <CustomButton type={'submit'} className={''} text={ID ? 'Update' : 'Submit'} />
          </div>
        </div>
      </form>
    </div>
  )
}