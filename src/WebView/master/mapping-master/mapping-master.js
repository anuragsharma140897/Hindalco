import React, { useState } from 'react'
import Building from './building/building'
import Zone from './zone/zone'
import Location from './location/location'
import Reader from './readers/reader'

export default function MappingMaster() {
    const [selectedBuilding, setSelectedBuilding] = useState(null)
    const [selectedZone, setSelectedZone] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedReader, setSelectedReader] = useState(null)
    
    return (
        <div className='grid grid-cols-4 gap-4'>
            <div><Building /></div>
            <div><Zone /></div>
            <div ><Location /></div>
            <div ><Reader /></div>
        </div>
    )
}
