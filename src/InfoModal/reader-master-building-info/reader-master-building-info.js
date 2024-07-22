import React from 'react'
import { Title } from 'rizzui'

export default function ReaderMasterBuildingInfo({row}) {
  return (
    <div>
        <Title as='h4' className='text-center'>{row?.buildingDetails}</Title>
        
    </div>
  )
}
