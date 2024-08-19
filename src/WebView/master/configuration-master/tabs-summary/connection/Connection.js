import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'

function Connection() {
    return (
        <div className='p-10 bg-white'>
           <div className='grid grid-cols-4 gap-x-4'>
           <CustomInput important={true} name="value" label="Server" />
           <CustomInput important={true} name="value" label="Port" />
           <CustomInput important={true} name="value" label="Protocol" />
           <CustomInput important={true} name="value" label="Client ID" />
           <CustomInput important={true} name="value" label="Clean Section" />
           <CustomInput important={true} name="value" label="Debug" />
           <CustomInput important={true} name="value" label="Basic Authentication" />
           <CustomInput important={true} name="value" label="Keep Alive" />
           </div>

        </div>
    )
}

export default Connection