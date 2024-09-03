import React from 'react'
import BillTo from './bill-to/BillTo'
import ShipTo from './ship-to/ShipTo'

function Details() {




    return (
        <div className='mt-5'>
            <div className='grid grid-cols-2 gap-x-5'>
                <BillTo />
                <ShipTo />
            </div>
        </div>
    )
}

export default Details