import React from 'react'
import { Title } from 'rizzui';

export default function BuildingReaderInfo({row}) {

  return (
    <div>
        <Title as='h4' className='text-center'>{row?.buildingName}</Title>
    </div>
  )
}
