import React from 'react'

function brokers() {
  return (
    <div>
      <div onClick={()=>window.location.pathname = 'device-manager/broker/add'}>Add</div>
    </div>
  )
}

export default brokers