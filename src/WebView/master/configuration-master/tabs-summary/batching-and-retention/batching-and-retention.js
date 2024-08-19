import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'

function BatchingAndRetention() {
  return (
    <div className='p-10 bg-white'>
    <div >
        <div>
            <div className='font-bold text-base'>Batching</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                <CustomInput important={true} name="value" label="Reporting Interval" />
                <CustomInput important={true} name="value" label="Max Payload Size" />
            </div>
        </div>
        <div>
            <div className='font-bold text-base'>Retention</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                <CustomInput important={true} name="value" label="Throttle" />
                <CustomInput important={true} name="value" label="No of Events" />
                <CustomInput important={true} name="value" label="Events Retention Time" />
            </div>
        </div>
  

    </div>

</div>
  )
}

export default BatchingAndRetention