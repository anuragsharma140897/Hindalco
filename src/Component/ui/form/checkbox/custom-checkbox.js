import React from 'react'
import { Checkbox, Title } from 'rizzui'

export default function CustomCheckBox({register, fieldName, errors}) {

  return (
    <div>
      <div><label className='rizzui-input-label block text-base mb-2 font-medium'>Empty Bag Status</label></div>
      <div className='mt-2 flex items-center'>
        <Checkbox label="Add Empty Bag" {...register(fieldName || 'dummyData')} error={errors?.[fieldName]?.message} />
      </div>
    </div>
  )
}
