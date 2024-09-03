import React from 'react'
import CustomInput from '../component/form/custom-input'
import CustomButton from '../component/form/custom-button'
import { useDispatch, useSelector } from 'react-redux'
import { setDevicesApiJson } from '../store/action/devices/devices-action'
import useValidation from '../hook/use-validation'
import { addDeviceSchema } from '../schema/add-device.schema'
import CustomSelect from '../component/form/custom-select'
import { Title } from 'rizzui'

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
  { label: 'GPS', value: 'gateway' },
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
  }

  const handleSelect = (e) => {
    let { label, value, id } = e
    
  }



  return (
    <div className='p-10 bg-white rounded-lg'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'><Title as='h4'>Basic Information</Title></div>
        <div className="grid grid-cols-4 gap-4 ">
          <CustomSelect name="deviceType" label={'Device Type'} placeholder={'Select Device Type'} options={DeviceType} onChange={handleSelect} />
          <CustomInput name="make" label="Make" validate={validate} value={reduxDevices?.apiJson?.make} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="model" label="Model" value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="firmwareVersion" label="Firmware Version" value={reduxDevices?.apiJson?.firmwareVersion} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSelect name="isCloudConfigurable" label={'Is Cloud Configurable'} placeholder={'Select Cloud Configurable'} options={Status} onChange={handleSelect} />
          <CustomSelect name="isSecureConnection" label={'Is Secure Connection'} placeholder={'Select Secure Connection'} options={Status} onChange={handleSelect} />
          <CustomSelect name="secureConnectionType" label={'Secure Connection Type'} placeholder={'Select Secure Connection Type'} options={SecureConnectionType} onChange={handleSelect} />
        </div>
        <div className='mt-8 mb-4'><Title as='h4'>Network Information</Title></div>
        <div className="grid grid-cols-4 gap-4 my-4">
          <CustomInput name="host" label="Host " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="port" label="Port " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="username" label="Username " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="password" label="Password " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSelect name="isDeviceMovable" label={'Is Cloud Configurable'} options={Protocol} onChange={handleSelect} />
          <CustomInput name="lat" label="Device Location (lat)" value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput name="lng" label="Device Location (lng) " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
        </div>
        <div className='flex gap-3 justify-end'>
          <CustomButton text={'Cancel'} variant='flat' className={''} />
          <CustomButton type={'submit'} className={''} text={'Submit'} />
        </div>
      </form>

    </div>
  )
}
