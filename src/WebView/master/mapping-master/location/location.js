import React from 'react'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaPlus } from 'react-icons/fa'

export default function Location() {
  return (
    <div>
      <CustomButton title={'Add Location'} LeftIcon={<FaPlus/>}/>
    </div>
  )
}
