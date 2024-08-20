import React, { useEffect } from 'react';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addWeighingScale, searchWeighingScale, updateWeighingScale } from '../../../Constant/Api/Api';
import { weighingScaleSchema } from '../../../Utils/validators/device/weighing-scale/create-weighing-scale.schema';
import { setWeighingScaleApiJson, setWeighingScaleData } from '../../../Store/Action/device/weighing-scale/weighing-scale-action';
import { CompileWeighingScale } from '../../../WebView/device/weighing-scale/promiss/weighing-scale.promiss';

export default function CreateWeighingScale() {

  const dispatch = useDispatch()
  const { errors, validate } = useValidation(weighingScaleSchema);
  const reduxWeighingScale = useSelector(state => state.WeighingScaleReducer)
  var url = window.location.pathname
  var ID = url.split('/')[4]

  useEffect(() => {
    if (ID && !reduxWeighingScale?.apiJson?.id) {
      loadDefault(ID)
    }
  }, [])

  const loadDefault = () => {
    var json = reduxWeighingScale?.searchJson
    json.search._id = ID
    HitApi(json, searchWeighingScale).then((result) => {
      if (result) {
        CompileWeighingScale(result).then((CompiledData) => {
          if (CompiledData?.content?.length === 1) {
            dispatch(setWeighingScaleApiJson(CompiledData?.content?.[0]))
          }
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var json = reduxWeighingScale?.apiJson
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
        HitApi(json, updateWeighingScale).then((result) => {
          if (result.status === 200) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/device/weighingscale'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
        })
      } else {
        Object.assign(json, { status: json?.status || 'active' })
        HitApi(json, addWeighingScale).then((result) => {
          if (result.status === 200) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/device/weighingscale'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
        })
      }
    } else {

    }
  };

  return (
    <div className='p-10 bg-white rounded-xl'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 lg:space-y-6">
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weighingScaleName" label="Weighing Scale Name" value={reduxWeighingScale?.apiJson?.weighingScaleName} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleType" label="Weighing Scale Type" value={reduxWeighingScale?.apiJson?.weighingScaleType} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleFrequency" label="Weighing Scale Frequency" value={reduxWeighingScale?.apiJson?.weighingScaleFrequency} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleInfo" label="Weighing Scale Info" value={reduxWeighingScale?.apiJson?.weighingScaleInfo} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weighingScaleSerialNo" label="Weighing Scale Serial No" value={reduxWeighingScale?.apiJson?.weighingScaleSerialNo} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleId" label="Weighing Scale ID" value={reduxWeighingScale?.apiJson?.weighingScaleId} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleIp" label="Weighing Scale IP" value={reduxWeighingScale?.apiJson?.weighingScaleIp} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScalePort" label="Weighing Scale Port" value={reduxWeighingScale?.apiJson?.weighingScalePort} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weighingScaleMacId" label="Weighing Scale Mac ID" value={reduxWeighingScale?.apiJson?.weighingScaleMacId} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleBuildingId" label="Weighing Scale Building ID" value={reduxWeighingScale?.apiJson?.weighingScaleBuildingId} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleZoneId" label="Weighing Scale Zone ID" value={reduxWeighingScale?.apiJson?.weighingScaleZoneId} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleAction" label="Weighing Scale Action" value={reduxWeighingScale?.apiJson?.weighingScaleAction} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weighingScaleStatus" label="Weighing Scale Status" value={reduxWeighingScale?.apiJson?.weighingScaleStatus} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScaleUsername" label="Weighing Scale Username" value={reduxWeighingScale?.apiJson?.weighingScaleUsername} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
            <CustomInput name="weighingScalePassword" label="Weighing Scale Password" value={reduxWeighingScale?.apiJson?.weighingScalePassword} error={errors} reduxState={reduxWeighingScale?.apiJson} setAction={setWeighingScaleApiJson} />
          </div>
          <div className='flex items-center justify-center gap-x-2' >
            <CustomButton text={'Back'} variant='flat' className={''} onClick={() => window.location.pathname = '/device/weighingscale'} />
            <CustomButton type={'submit'} className={''} text={ID ? 'Update' : 'Submit'} />
          </div>
        </div>
      </form>
    </div>
  )
}