import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'
import { useSelector } from 'react-redux'
import { setConfigurationMasterApiJson } from '../../../../../Store/Action/master/configuration-master/configuration-master-action';
import useValidation from '../../../../../Hooks/useValidation';
import { configurationMasterSchema } from '../../../../../Utils/validators/master/configuration-master/configuration-master-scheema';

function Topic() {

    const reduxConfiguration = useSelector(state => state.ConfigurationMasterReducer);

    return (
        <div className='py-5 bg-white'>
            <div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Management Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4'>
                        <CustomInput important={true} name="managementEventsTopic" label="Topic" value={reduxConfiguration?.apiJson?.managementEventsTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                        <CustomInput important={true} name="value" label="QOS" />
                        <CustomInput important={true} name="value" label="Retain" />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Tag Data Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4 px-10'>
                        <CustomInput important={true} name="value" label="Topic" />
                        <CustomInput important={true} name="value" label="QOS" />
                        <CustomInput important={true} name="value" label="Retain" />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Management</div>
                    <div className='p-10'>
                        <div>
                            <div className='font-bold text-base underline'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="value" label="Topic" />
                                <CustomInput important={true} name="value" label="QOS" />
                                <CustomInput important={true} name="value" label="Retain" />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base underline'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="value" label="Topic" />
                                <CustomInput important={true} name="value" label="QOS" />
                                <CustomInput important={true} name="value" label="Retain" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Control</div>
                    <div className='p-10'>
                        <div>
                            <div className='font-bold text-base underline'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="value" label="Topic" />
                                <CustomInput important={true} name="value" label="QOS" />
                                <CustomInput important={true} name="value" label="Retain" />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base underline'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
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