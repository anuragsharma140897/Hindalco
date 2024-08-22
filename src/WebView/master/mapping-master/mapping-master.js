import React, { useState } from 'react'
import Building from './building/building'
import Zone from './zone/zone'
import Location from './location/location'
import Reader from './readers/reader'
import { useSelector } from 'react-redux'
import Site from './site/site'

export default function MappingMaster() {
    const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)

    return (
        <div className='grid grid-cols-5 gap-4'>
             <div><Site /></div>
            <div><Building /></div>
            {reduxMappingMaster?.mappingJson?.selectedBuildingID?<div><Zone /></div> : null}
            {reduxMappingMaster?.mappingJson?.selectedZoneID?<div ><Location /></div> : null}
            {reduxMappingMaster?.mappingJson?.selectedLocationID?<div ><Reader /></div> : null}
        </div>
    )
}
