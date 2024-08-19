import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'

function Certificates() {
  return (
    <div className='p-10 bg-white'>
    <div >
        <div>
            <div className='font-bold text-base'>Use Instaaled Certificates</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                <CustomInput important={true} name="value" label="Certificates" />
                <CustomInput important={true} name="value" label="Passphrase" />
            </div>
        </div>
        <div>
            <div className='font-bold text-base'>Use CA Certs from Store</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                <CustomInput important={true} name="value" label="Cert Algorithm" />
                <CustomInput important={true} name="value" label="Cert Format" />
                <CustomInput important={true} name="value" label="Verify Server Certificate" />
                <CustomInput important={true} name="value" label="Verify Host Name" />

            </div>
        </div>
    </div>

</div>
  )
}

export default Certificates