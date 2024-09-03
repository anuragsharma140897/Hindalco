import React from 'react'
import CustomInput from '../component/form/custom-input'
import CustomButton from '../component/form/custom-button'
import { useDispatch, useSelector } from 'react-redux'
import { setDevicesApiJson } from '../store/action/devices/devices-action'
import useValidation from '../hook/use-validation'
import { addDeviceSchema } from '../schema/add-device.schema'
import CustomSelect from '../component/form/custom-select'
import { Title } from 'rizzui'
import CustomSwitch from '../../../../Component/ui/switch/custom-switch'

export const Status = [
  { label: 'true', value: 'true' },
  { label: 'false', value: 'false' },
]

export const Protocol = [
  { label: 'MQTT', value: 'MQTT' },
  { label: 'UDP', value: 'UDP' },
  { label: 'TCP', value: 'TCP' },
  { label: 'HTTP', value: 'HTTP' },
  { label: 'HTTPS', value: 'HTTPS' },
]

export const DeviceType = [
  { label: 'Gateway', value: 'gateway' },
  { label: 'GPS', value: 'GPS' },
]

export const SecureConnectionType = [
  { label: 'TLS', value: 'TLS' },
  { label: 'SSL', value: 'SSL' },
]

export default function AddDevice() {

  const dispatch = useDispatch()
  const reduxDevices = useSelector(state => state.DevicesReducer)
  const { errors, validate } = useValidation(addDeviceSchema);

  const handleSubmit = () => {
    var json = reduxDevices?.apiJson

    console.log('json', json);

  }

  const handleSelect = (e, name) => {
    let { label, value, id } = e
    var json = reduxDevices?.apiJson || {}
    Object.assign(json, {[name]:value})
    dispatch(setDevicesApiJson(json))
  }

  return (
    <div className='p-10 bg-white rounded-lg'>
      <form >
        <div className='mb-4'><Title as='h4'>Basic Information</Title></div>
        <div className="grid grid-cols-4 gap-4 ">
          <CustomSelect name="deviceType" label={'Device Type'} options={DeviceType} onChange={(e)=>handleSelect(e, 'deviceType')} />
          <CustomInput name="make" label="Make" validate={validate} value={reduxDevices?.apiJson?.make} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="model" label="Model" value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="firmwareVersion" label="Firmware Version" value={reduxDevices?.apiJson?.firmwareVersion} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSwitch name="isCloudConfigurable" label={'Is Cloud Configurable'} position={'top'} value={reduxDevices?.apiJson?.isCloudConfigurable} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSelect name="protocol" label={'Protocol'} options={Protocol} onChange={(e)=>handleSelect(e, 'protocol')} />
          <CustomSwitch name="isSecureConnection" label={'Is Secure Connection'} position={'top'} value={reduxDevices?.apiJson?.isSecureConnection} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSelect name="secureConnectionType" label={'Secure Connection Type'} options={SecureConnectionType} onChange={(e)=>handleSelect(e, 'secureConnectionType')} />
        </div>
        <div className='mt-8 mb-4'><Title as='h4'>Network Information</Title></div>
        <div className="grid grid-cols-4 gap-4 my-4">
          <CustomInput name="host" label="Host " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="port" label="Port " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="username" label="Username " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="password" label="Password " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSwitch name="isDeviceMovable" label={'Is Device Movable'} position={'top'} value={reduxDevices?.apiJson?.isDeviceMovable} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="lat" label="Device Location (lat)" value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="lng" label="Device Location (lng) " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
        </div>
        <div className='flex gap-3 justify-end'>
          <CustomButton text={'Cancel'} variant='flat' className={''} />
          <CustomButton type={'submit'} className={''} text={'Submit'} onClick={handleSubmit} />
        </div>
      </form>

    </div>
  )
}
