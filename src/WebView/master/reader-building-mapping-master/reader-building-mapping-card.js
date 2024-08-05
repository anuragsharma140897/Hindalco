import React from 'react'
import { Colors } from '../../../Constant/Colors/Color'
import { FaRegBuilding } from "react-icons/fa";
import bgmapping from '../../../Images/buildingMapping.png'



function ReaderBuildingMappingCard() {
    return (
        <div className='shadow-xl rounded-xl'>
            <div className='flex py-3 px-4 gap-x-4 items-center rounded-t-xl' style={{ backgroundColor: Colors.LOGINRED }}>
                <FaRegBuilding color='white' size={20} />
                <div className='text-white font-semibold text-base'>Buildings</div>
            </div>
            <div style={{ backgroundImage: `url(${bgmapping}) `, backgroundSize: "100%  100% " }}>
                <div className='pb-3 rounded-b-xl' style={{ background: '#ffffff99' }}>
                    <div className='flex px-4 py-2 items-center justify-between  border-b'>
                        <div>Building Info</div>
                        <div className='font-bold'>72</div>
                    </div>
                    <div className='flex px-4 py-2 items-center justify-between  border-b'>
                        <div>Building Info</div>
                        <div className='font-bold'>72</div>
                    </div>
                    <div className='flex px-4 py-2 items-center justify-between'>
                        <div>Building Info</div>
                        <div className='font-bold'>72</div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ReaderBuildingMappingCard