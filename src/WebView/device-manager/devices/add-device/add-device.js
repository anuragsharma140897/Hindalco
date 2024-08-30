import React from 'react'
import CustomInput from '../component/form/custom-input'
import CustomButton from '../component/form/custom-button'
import { useDispatch, useSelector } from 'react-redux'
import { setDevicesApiJson } from '../store/action/devices/devices-action'
import useValidation from '../hook/use-validation'
import { addDeviceSchema } from '../schema/add-device.schema'
import CustomSelect from '../component/form/custom-select'

export const Status = [
  { label: 'true', value: 'true' },
  { label: 'false', value: 'false' },
]

export const Protocol = [
  { label: 'MQTT', value: 'mqtt' },
  { label: 'UDP', value: 'udp' },
  { label: 'TCP', value: 'tcp' },
  { label: 'HTTP', value: 'http' },
  { label: 'HTTPS', value: 'https' },
]

export const DeviceType = [
  { label: 'Gateway', value: 'gateway' },
  { label: 'GPS', value: 'gateway' },

]

export default function AddDevice() {

  const dispatch = useDispatch()
  const reduxDevices = useSelector(state => state.DevicesReducer)
  const { errors, validate } = useValidation(addDeviceSchema);

  const handleSubmit = () => {

  }

  const handleSelect = (e) => {
    let { label, vlue, id } = e

  }

  return (
    <div className='p-10'>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <CustomInput name="make" label="Site Name" validate={validate} value={reduxDevices?.apiJson?.make} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput important={false} name="model" label="Building " value={reduxDevices?.apiJson?.model} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomInput important={false} name="firmwareVersion" label="Area" value={reduxDevices?.apiJson?.firmwareVersion} error={errors} reduxState={reduxDevices?.apiJson} setAction={setDevicesApiJson} />
          <CustomSelect name="isCloudConfigurable" label={'Is Cloud Configurable'} options={Status} onChange={handleSelect} />
          <div className='flex gap-3 justify-end'>
            <CustomButton text={'Cancel'} variant='flat' className={''} />
            {/* <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} /> */}
          </div>
        </div>
      </form>

    </div>
  )
}
