import React from 'react'
import CustomButton from '../../../Component/ui/buttons/custom-button'

function brokers() {
  return (
    <div>
      <CustomButton text={"Add Broker"} onClick={()=>window.location.pathname = 'device-manager/broker/add'}/>
    </div>
  )
}

export default brokers