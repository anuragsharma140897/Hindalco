import React from 'react'
import { Colors } from '../../../Constant/Colors/Color'

function ReaderHealthCard({ data }) {

    return (
        <div className='bg-white shadow rounded-xl p-3' style={{border:data.status === "Critical" && `1px solid ${Colors.CRITICAL}`}}>
            <div >
                <div className='flex justify-between'>
                    <div >
                        <span className='font-semibold' >Building info: </span>{data?.buildingInfo}
                    </div>
                    <div className='h-3 w-3  rounded-full' style={{ background: data.status === "Active" ? Colors.ACTIVE : data.status === "in Active" ? Colors.INACTIVE : data.status === "Critical" ? Colors.CRITICAL : "" }}></div>
                </div>
                <div className='flex justify-between'>
                    <div >
                        <span className='font-semibold' >Reader info: </span>{data?.readerInfo}
                    </div>
                    <div>{data?.status}</div>
                </div>
            </div>
            <hr className='mt-3' />
            <div className='grid grid-cols-3 gap-5 mt-3'>
                <div className='p-2 rounded-lg' style={{ background: Colors.DEFAULTBG }}>
                    <div className='text-xs text-black' >Up Time</div>
                    <div className='text-xs font-semibold text-black ' >{data.upTime}</div>
                </div>
                <div className='p-2 rounded-lg' style={{ background: Colors.DEFAULTBG }}>
                    <div className='text-xs text-black' >Down Time</div>
                    <div className='text-xs font-semibold text-black ' >{data?.downTime}</div>
                </div>
                <div className='p-2 rounded-lg' style={{ background: Colors.DEFAULTBG }}>
                    <div className='text-xs text-black' >Active</div>
                    <div className='text-xs font-semibold text-black ' >{data.lastActive}</div>
                </div>



            </div>
        </div>

    )
}

export default ReaderHealthCard