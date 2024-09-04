import React from 'react'
import UserManagementIcon from '../../../Constant/Icons/user-management-icon'
import ReaderBuildingMappingCard from './reader-building-mapping-card'

export default function ReaderBuildingMappingMaster() {
  return (
    <div className='my-10'>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
     <ReaderBuildingMappingCard/>
     <ReaderBuildingMappingCard/>
     <ReaderBuildingMappingCard/>
     <ReaderBuildingMappingCard/>



     </div>
    </div>
  )
}
