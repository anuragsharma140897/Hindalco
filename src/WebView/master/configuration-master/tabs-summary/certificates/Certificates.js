import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'

function Certificates() {
  return (
    <div className='py-5 bg-white'>
    <div >
        <div>
            <div className='font-bold text-base bg-lightpink p-2'>Use Instaaled Certificates</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 '>
                <CustomInput important={true} name="value" label="Certificates" />
                <CustomInput important={true} name="value" label="Passphrase" />
            </div>
        </div>
        <div>
            <div className='font-bold text-base bg-lightpink p-2'>Use CA Certs from Store</div>
            <div className='mt-5 grid grid-cols-3 gap-x-4 '>
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