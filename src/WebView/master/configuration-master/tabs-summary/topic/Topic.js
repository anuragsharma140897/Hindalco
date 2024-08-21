import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'
import { useSelector } from 'react-redux'
import { setConfigurationMasterApiJson } from '../../../../../Store/Action/master/configuration-master/configuration-master-action';
import CustomCheckBox from '../../../../../Component/ui/form/checkbox/custom-checkbox';

function Topic() {

    const reduxConfiguration = useSelector(state => state.ConfigurationMasterReducer);

    return (
        <div className='py-5 bg-white'>
            <div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Management Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4'>
                        <CustomInput important={true} name="managementEventsTopic" label="Topic" value={reduxConfiguration?.apiJson?.managementEventsTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                        <CustomInput important={true} name="managementEventsqos" label="QOS"  value={reduxConfiguration?.apiJson?.managementEventsqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                        <CustomCheckBox important={true} name="managementEventsretain" label="Retain"  value={reduxConfiguration?.apiJson?.managementEventsretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}/>
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Tag Data Events</div>
                    <div className='mt-5 grid grid-cols-3 gap-x-4'>
                        <CustomInput important={true} name="tagEventsTopic" label="Topic" value={reduxConfiguration?.apiJson?.tagEventsTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                        <CustomInput important={true} name="tagEventsqos" label="QOS" value={reduxConfiguration?.apiJson?.tagEventsqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                        <CustomCheckBox important={true} name="tagEventsretain" label="Retain" value={reduxConfiguration?.apiJson?.tagEventsretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Management</div>
                    <div className='p-2'>
                        <div>
                            <div className='font-bold text-base underline'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="managementcommandTopic" label="Topic" value={reduxConfiguration?.apiJson?.managementcommandTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                                <CustomInput important={true} name="managementcommandqos" label="QOS"  value={reduxConfiguration?.apiJson?.managementcommandqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}/>
                                <CustomCheckBox important={true} name="managementcommandretain" label="Retain" value={reduxConfiguration?.apiJson?.managementcommandretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base underline'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="managementresponseTopic" label="Topic" value={reduxConfiguration?.apiJson?.managementresponseTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                                <CustomInput important={true} name="managementresponseqos" label="QOS" value={reduxConfiguration?.apiJson?.managementresponseqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                                <CustomCheckBox important={true} name="managementresponseretain" label="Retain" value={reduxConfiguration?.apiJson?.managementresponseretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Control</div>
                    <div className='p-2'>
                        <div>
                            <div className='font-bold text-base underline'>Command</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="controlcommandTopic" label="Topic" value={reduxConfiguration?.apiJson?.controlcommandTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                                <CustomInput important={true} name="controlcommandqos" label="QOS"  value={reduxConfiguration?.apiJson?.controlcommandqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                                <CustomCheckBox important={true} name="controlcommandretain" label="Retain"  value={reduxConfiguration?.apiJson?.controlcommandretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                            </div>
                        </div>
                        <div>
                            <div className='font-bold text-base underline'>Response</div>
                            <div className='mt-5 grid grid-cols-3 gap-x-4'>
                                <CustomInput important={true} name="controlresponseTopic" label="Topic" value={reduxConfiguration?.apiJson?.controlresponseTopic} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                                <CustomInput important={true} name="controlresponseqos" label="QOS"  value={reduxConfiguration?.apiJson?.controlresponseqos} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                                <CustomCheckBox important={true} name="controlresponseretain" label="Retain"  value={reduxConfiguration?.apiJson?.controlresponseretain} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Topic