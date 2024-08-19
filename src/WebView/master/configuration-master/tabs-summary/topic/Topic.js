import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'

function Topic() {
    return (
        <div className='p-10 bg-white'>
            <div >
                <div>
                    <div className='font-bold text-base'>Management Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                        <CustomInput important={true} name="value" label="Topic" />
                        <CustomInput important={true} name="value" label="QOS" />
                        <CustomInput important={true} name="value" label="Retain" />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base'>Tag Data Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                        <CustomInput important={true} name="value" label="Topic" />
                        <CustomInput important={true} name="value" label="QOS" />
                        <CustomInput important={true} name="value" label="Retain" />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base'>Management</div>
                    <div className='p-10'>
                        <div>
                            <div className='font-bold text-base'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                                <CustomInput important={true} name="value" label="Topic" />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                                <CustomInput important={true} name="value" label="Topic" />
                                <CustomInput important={true} name="value" label="QOS" />
                                <CustomInput important={true} name="value" label="Retain" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base'>Control</div>
                    <div className='p-10'>
                        <div>
                            <div className='font-bold text-base'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                                <CustomInput important={true} name="value" label="Topic" />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                                <CustomInput important={true} name="value" label="Topic" />
                                <CustomInput important={true} name="value" label="QOS" />
                                <CustomInput important={true} name="value" label="Retain" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Topic